"use strict";

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'prod';
const isStatic = ENV === 'dev';
const isHmr = ENV === 'hmr';
const isTest = ENV === 'test';
const isDll = ENV === 'dll';
const isAot = ENV.includes('aot');
const isAotServer = ENV.includes('aotServer');

module.exports = function makeWebpackConfig() {
    let config = {};

    if (!isTest && !isProd && !isDll) {
        if (!fs.existsSync('./dll/ng.dll.js')) {
            throw "Can't find DLL, please use 'npm run dll' to get it.";
        }
    }

    if (isProd) {

        let entries = Object.assign({}, getEntries('./ux-components/src/**/*.module.ts'), getEntries('./ux-components/src/**/*.component.ts'), getEntries('./ux-services/src/**/*.ts'));

        console.log('Entries: ', entries);
        config.entry = entries;

        config.output = {
            path: path.join(__dirname, './dist'),
            filename: '[name].js',
            library: 'ux-ng2',
            libraryTarget: 'umd',
            umdNamedDefine: true,
            chunkFilename: '[name].js',
            publicPath: '/assets/js/'
        };

        config.externals = [
            '@angular/common',
            '@angular/core',
            '@angular/forms',
            '@angular/http',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/router',
            'rxjs',
            'core-js/es6',
            'core-js/es7/reflect',
            'zone.js/dist/zone',
            'reflect-metadata/Reflect'
        ];

    } else {

        if (!isAot) {
            config.devtool = 'cheap-module-eval-source-map';
        }

        config.entry = {
            'ng-app': './ux-components-showcase/src/ng-app.ts',
        };

        config.output = isTest ? {} : {
            path: path.join(__dirname, 'ux-components-showcase'),
            filename: '[name].js',
            chunkFilename: '[name].js'
        };
    }

    config.resolve = {
        // only discover files that have those extensions
        extensions: ['.ts', '.js', '.json', '.html'],
    };

    config.module = {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader?'
                    },
                    {
                        loader: 'angular-router-loader?' + (isAot ? 'aot=true&genDir=./aot' : ''),
                    }
                ]
                .concat(isAot ? [] : 'angular2-template-loader'),
                exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/, /\.less$/, /\.css$/]
            },
            {
                test: /\.html$/, loader: 'raw-loader',
                exclude: [/node_modules\/(?!(ng2-.+))/, root('ux-components-showcase/index.html')]
            },
            // {
            //     test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //     loader: "url-loader"
            // },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "raw-loader"
                    },
                    {
                        loader: "markdown-loader"
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {loader: "css-to-string-loader"},
                    {loader: "css-loader"},
                    {
                        loader: "less-loader",
                        options: {
                            globalVars: {
                                theme: "base"
                            }
                        }
                    }
                ]
            }
        ]
    };

    if (isTest) {
        config.module.rules.push({
            test: /\.ts$/,
            enforce: "post",
            include: path.resolve("src"),
            loader: "istanbul-instrumenter-loader",
            exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
        });
    }

    if (!isProd && !isTest && !isDll) {

        config.plugins = ([
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'STATIC': ENV === 'serve'
                }
            }),
            new HtmlWebpackPlugin({
                template: root('ux-components-showcase/index.html'),
                inject: false,
            }),
            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require(`./dll/ng-manifest.json`)
            }),
            new CopyWebpackPlugin([{ from: "dll" }])
        ]);
    }

    if (isProd) {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({mangle: true})
        );
    }

    if (isDll) {
        config.plugins = [
            new webpack.DllPlugin({
                name: '[name]',
                path: root('./dll/[name]-manifest.json'),
            })
        ];

        config.entry = {
            ng: [
                "core-js/es6",
                'zone.js',
                "zone.js/dist/zone",
                'core-js/client/shim.js',
                'core-js/es6/reflect',
                'core-js/es7/reflect',
                'hammerjs/hammer',
                "@angular/common",
                "@angular/compiler",
                "@angular/core",
                "@angular/forms",
                "@angular/http",
                "@angular/platform-browser",
                "@angular/platform-browser-dynamic",
                "@angular/router",
                "rxjs",
                "rxjs/Subscription",
                "moment",
                "ng2-ace-editor/src/component",
                "brace",
                "ngx-color-picker",
                "highcharts",
                "angular2-virtual-scroll"
            ]
        };

        config.output = {
            path: root('./dll/'),
            filename: '[name].dll.js',
            library: '[name]'
        };
    }

    config.stats = {
        assets: true,
        chunks: false,
        children: false,
        errors: true,
        errorDetails: true,
        timings: true,
        warnings: true
    };

    if (isAot) {

        config.entry = {
            'ng-app': './aot/ng-main-aot.ts',
        };

        config.output = isTest ? {} : {
            path: path.join(__dirname, './dist/'),
            filename: '[name].js',
            chunkFilename: '[name].js'
        };

        config.plugins = [
            new webpack.optimize.UglifyJsPlugin({mangle: true, sourceMap: false}),
            new webpack.optimize.CommonsChunkPlugin({
                async: "chunk",
                children: true,
                minChunks: 2
            })
        ];

        config.plugins.push(
            new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: !!process.env.npm_config_report })
        );

        config.stats = {
            assets: true,
            chunks: false,
            children: false,
            errors: true,
            errorDetails: true,
            timings: true,
            warnings: true
        };
    }

    if (isAotServer) {
        config.entry = {
            'server': './webpack-server.js'
        };
        config.output = {};
    }

    //dev server
    config.devServer = {
        contentBase: isAotServer ? "./dist" : "./ux-components-showcase",
        quiet: false,
        compress: true,
        inline: !isTest && !isProd && !isDll,
        stats: "errors-only",
        historyApiFallback: true,
        port: 8080,
        watchOptions: {
            aggregateTimeout: 100,
            ignored: [/\.less/, /\.css/, /\.woff/]
        },
        clientLogLevel: 'none'
    };

    
    // Helpers
    function getEntries(globString) {

        const pathList = glob.sync(globString);
        let entries = {};

        if (Array.isArray(pathList)) {
            pathList.forEach(function (path) {
                let fileName = path.split('.ts')[0];

                entries[fileName] = path;
            });
        }

        return entries;
    }

    return config;
}();

function root(__path = '.') {
    return path.join(__dirname, __path);
}