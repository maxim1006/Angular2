"use strict";

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');



/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ENV = process.env.npm_lifecycle_event ? process.env.npm_lifecycle_event : '';
const isProd = ENV === 'prod';
const isStatic = ENV === 'devWebpack';
const isHmr = ENV === 'hmrWebpack';
const isTest = ENV === 'test';
const isDll = ENV === 'dll';
const isAot = ENV.includes('aot');
const isProdServer = ENV.includes('prodServer');
const isDev = isStatic || isHmr;



module.exports = function makeWebpackConfig() {
    console.log(`You are in ${ENV} mode`);

    let config = {};

    if (isDev) {
        if (!fs.existsSync('./dll/ng.dll.js')) {
            throw "Can't find DLL, please use 'npm run dll' to get it.";
        }
    }

    if (isProdServer) {
        if (!fs.existsSync('./dist')) {
            throw "Can't find ./dist, please use 'npm run prod' to get it.";
        }
    }

    if (isHmr || isStatic) {
        config.devtool = 'cheap-module-eval-source-map';
    } else {
        config.devtool = 'source-map';
    }

    config.entry = {
        'ng-app': './src/app/ng-main.ts'
    };

    if (isAot) {
        config.entry = {
            'ng-app': './aot/ng-main-aot.ts',
        };
    }

    config.output = isTest ? {} : {
        path: path.join(__dirname, './dist/'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    };

    if (isProdServer) {
        config.entry = {
            'server': './webpack-server.js'
        };
        config.output = {};
    }

    config.resolve = {
        extensions: ['.ts', '.js', '.json', '.html'],
    };

    config.module = {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'awesome-typescript-loader?'
                },
                    {
                        loader: 'angular-router-loader?' + (isAot ? 'aot=true&genDir=./aot' : ''),
                    }
                ]
                    .concat(isAot ? [] : 'angular2-template-loader')
                    .concat(isHmr ? '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd : []),
                exclude: [/\.(spec|e2e|d)\.ts$/]
            },
            {
                test: /\.html$/, loader: 'raw-loader',
                exclude: [root('src/index.html')]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?name=[name].[ext]&limit=10000&useRelativePath=true"
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



    //let url = process.env.ENV;
    if (isHmr || isStatic) {
        config.plugins = [
            new webpack.NoEmitOnErrorsPlugin(), //оптимизация при ошибках
            new webpack.DefinePlugin({
                'process.env': {
                    'STATIC': isStatic,
                    'HMR': isHmr,
                    'PROD': isProd,
                    'AOT': isAot
                }
            })
        ]
            .concat(isHmr ? new webpack.HotModuleReplacementPlugin() : [])
            .concat(isDev ? [
                new HtmlWebpackPlugin({
                    template: root('src/index.html'),
                    inject: false,
                }),
                new webpack.DllReferencePlugin({
                    context: '.',
                    manifest: require(`./dll/ng-manifest.json`)
                }),
                new CopyWebpackPlugin([{ from: './dll'}])
            ] : []);
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
                'core-js/client/shim.js',
                'core-js/es6/reflect.js',
                'core-js/es7/reflect.js',
                'hammerjs/hammer',
                '@angularclass/hmr',
                "@angular/common",
                "@angular/compiler",
                "@angular/core",
                "@angular/forms",
                "@angular/http",
                "@angular/platform-browser",
                "@angular/platform-browser-dynamic",
                "@angular/router",
                "rxjs",
            ]
        };

        config.output = {
            path: root('./dll/'),
            filename: '[name].dll.js',
            library: '[name]'
        };
    }



    if (isProd) {
        config.plugins = [
        ];
    }



    if (isAot) {
        config.plugins = [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                },
                output: {
                    comments: false
                },
                sourceMap: false
            }),
            new webpack.optimize.CommonsChunkPlugin({
                async: "chunk",
                children: true,
                minChunks: 2
            }),
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



    //dev server
    config.devServer = {
        contentBase: isProdServer ? "./dist" : "./src",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        historyApiFallback: true,
        compress: true,
        quiet: false,
        inline: isHmr || isStatic || isProdServer,
        hot: isHmr,
        stats: "minimal",
        port: 9000,
        watchOptions: {
            aggregateTimeout: 50,
            ignored: [/node_modules/]
        }
    };



    return config;
};



function root(__path = '.') {
    return path.join(__dirname, __path);
}
