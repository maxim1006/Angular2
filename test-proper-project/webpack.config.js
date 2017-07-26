"use strict";

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;



/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'prod';
const isStatic = ENV === 'devWebpack';
const isHmr = ENV === 'hmrWebpack';
const isTest = ENV === 'test';
const isDll = ENV === 'dll';
const isAot = ENV.includes('aot');
const isAotServer = ENV.includes('aotServer');
const isDev = isStatic || isHmr;



module.exports = function makeWebpackConfig(options = {}) {
    console.log(`You are in ${ENV} mode`);

    let config = {};

    if (isDev) {
        if (!fs.existsSync('./dll/ng.dll.js')) {
            throw "Can't find DLL, please use 'npm run dll' to get it.";
        }
    }

    // config.watch = !isProd;
    if (!isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'source-map'; //это опционально, если надо и в проде подебажить, а так могу отключить
    }

    config.entry = {
        'ng-app': './src/scripts/ng-main.ts', // our angular app
        // 'ng': ['./src/scripts/ng-polyfills.ts', './src/scripts/ng.ts'], //так как использую DLL нет смысла использовать чанки
        // 'result': './example.ts'  //just for check treeshaking - "module": "es2015", in tsconfig
    };

    if (isAot) {
        config.entry = {
            'ng-app': './src/scripts/ng-main-aot.ts', // our angular app
        };
    }

    config.output = isTest ? {} : {
        path: path.join(__dirname, './src/public/'), //в проде сюда будет падать бандл
        //закомментил, так как не получается сделать и publicPath и настроить работу htmlWebpackPlugin, а для
        //HMR нужно чтобы publicPath в оутпуте совпадал с сервером
        // publicPath: '/js/', //need to be the same as in server,
        filename: '[name].js',
        // chunkFilename: '[name].js',
        // filename: isProd ? '[hash].js' : '[name].js'
    };

    if (isAotServer) {
        config.entry = {
            'server': './webpack-server.js'
        };
        config.output = {};
    }


    //files to resolve
    config.resolve = {
        // only discover files that have those extensions
        extensions: ['.ts', '.js', '.json', '.html'],
    };



    //посмотреть размер созданных файлов, можно использовать stats параметр в devServer
    // config.performance = {
    //     hints: "warning"
    // };


    //loaders
    config.module = {
        rules: [
            {
                test: /\.ts$/,
                use: isAot ? [{loader: '@ngtools/webpack'}] : [
                    {
                        loader: 'awesome-typescript-loader?'
                    },
                    {
                        loader: 'angular2-template-loader',
                    },
                    {
                        loader: 'angular-router-loader',
                    }
                ].concat(isHmr ? '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd : []),
                exclude: [/\.(spec|e2e|d)\.ts$/]
            },
            {
                test: /\.html$/, loader: 'raw-loader',
                exclude: [/node_modules\/(?!(ng2-.+))/, root('src/public/index.html')]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?name=[name].[ext]&limit=10000&useRelativePath=true"
            },
            {
                test: /\.less$/,
                use: [
                    {loader: "css-to-string-loader"},
                    {loader: "css-loader"},
                    {loader: "postcss-loader"},
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



    //let url = process.env.ENV;
    if (!isTest) {
        config.plugins = [
            new webpack.NoEmitOnErrorsPlugin(), //оптимизация при ошибках
            new webpack.DefinePlugin({
                'process.env': {
                    'STATIC': isStatic,
                    'HMR': isHmr,
                    'PROD': isProd,
                    'AOT': isAot
                }
            }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: ['ng-app', 'ng']  //создать и запомнить в памяти ng.js, который является общей частью, состоящей из ['./src/scripts/ng-polyfills.ts', './src/scripts/ng.ts'], при этом заэкспортиться модуль ng.ts, но выполнятся оба. Потерял актульность с DLL
            // }),
            new WebpackOnBuildPlugin(function(stats) {
                console.log('build is done');
            })
        ]
            .concat(isHmr ? new webpack.HotModuleReplacementPlugin() : [])
            .concat(isDev ? [
                new HtmlWebpackPlugin({
                    template: root('src/public/index.html'),
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
        config.plugins.push(
            new webpack.DllPlugin({
                name: '[name]',
                path: root('./dll/[name]-manifest.json'),
            })
        );

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
            // https://webpack.js.org/guides/production-build/
            // UglifyJsPlugin это делает автоматом вебпак с флагом -p, так что просто оставлю его, если включить плагин будет ошибка, так как он 2 раза подключится
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false,
            //         screw_ie8: true,
            //         conditionals: true,
            //         unused: true,
            //         comparisons: true,
            //         sequences: true,
            //         dead_code: true,
            //         evaluate: true,
            //         if_return: true,
            //         join_vars: true,
            //     },
            //     output: {
            //         comments: false
            //     },
            //     sourceMap: true
            // }),
            // new webpack.LoaderOptionsPlugin({
            //     minimize: true,
            //     debug: false
            // }),
        ];
    }



    if (isAot) {
        config.plugins = [
            new AotPlugin({
                tsConfigPath: './tsconfig.json',
                entryModule: root('src/scripts/app.module.ts#AppModule')
            }),
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
                sourceMap: true
            }),
            new WebpackOnBuildPlugin(function(stats) {
                console.log('build in aot is done');
            })
        ];

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
        contentBase: "./src/public",
        // publicPath: "/js/",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        // historyApiFallback: {
        //     index: 'index.html',
        //     rewrites: [
        //         { from: '/.*\.chunk.js', to: '/js/.*\.chunk.js'},
        //         { from: '/', to: '/index.html'}
        //     ]
        // },
        historyApiFallback: true,
        compress: true, // enable gzip compression
        quiet: false,
        inline: isHmr || isStatic || isAotServer,
        hot: isHmr,
        stats: "minimal",
        // stats: {
        //     assets: true,
        //     cached: true,
        //     timings: true,
        //     performance: true,
        // }, // none (or false), errors-only, minimal, normal (or true), detailed and verbose
        port: 9000,
        watchOptions: {
            aggregateTimeout: 50, //по умолчанию 300
            //poll: 1000
            ignored: /node_modules/
        }
    };



    return config;
}();



function root(__path = '.') {
    return path.join(__dirname, __path);
}
