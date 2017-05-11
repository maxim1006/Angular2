"use strict";

const path = require('path');
const webpack = require('webpack');
const WebpackOnBuildPlugin = require('on-build-webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');



/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'prod';
const isStatic = ENV === 'dev';
const isHmr = ENV === 'hmr';
const isTest = ENV === 'test';



module.exports = function makeWebpackConfig() {
    var config = {};

    // config.watch = !isProd;
    if (!isProd) {
        config.devtool = 'source-map';
    } else {
         config.devtool = 'source-map'; //это опционально, если надо и в проде подебажить, а так могу отключить
    }

    config.entry = {
        'ng-app': './src/scripts/ng-main.ts', // our angular app
        'ng': ['./src/scripts/ng-polyfills.ts', './src/scripts/ng.ts'],
    };

    config.output = isTest ? {} : {
        path: path.join(__dirname, './src/markup/js'),
        filename: '[name].js'
        // filename: isProd ? '[name].[hash].js' : '[name].js'
    };



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
                        loader: 'angular2-template-loader',
                    }
                ],
                exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },
            {
                test: /\.html$/, loader: 'raw-loader',
                exclude: [/node_modules\/(?!(ng2-.+))/]
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
                    'IS_STATIC_MODE': ENV === 'devWebpack',
                    'HMR': ENV === 'hmrWebpack'
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['ng']  //создать и запомнить в памяти ng.js, который является общей частью, состоящей из ['./src/scripts/ng-polyfills.ts', './src/scripts/ng.ts'], при этом заэкспортиться модуль ng.ts, но выполнятся оба.
            }),
            new WebpackOnBuildPlugin(function(stats) {
                console.log('build is done');
            })
        ];
    }



    if (isProd) {
        config.plugins.push(
            //https://webpack.js.org/guides/production-build/
            //UglifyJsPlugin это делает автоматом вебпак с флагом -p
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
            //         comments: false,
            //     }
            // }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            })
            //нужен, чтобы автоматом проставлять хеш в html
            //new HtmlWebpackPlugin()
        );
    }



    //dev server
    config.devServer = {
        contentBase: "./src/markup",
        publicPath: "/js/",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        historyApiFallback: {
            index: 'index.html',
            rewrites: [
                { from: '/', to: '/index.html'}
            ]
        },
        compress: true, // enable gzip compression
        quiet: false,
        stats: 'minimal', // none (or false), errors-only, minimal, normal (or true) and verbose
        port: 9000,
        watchOptions: {
            aggregateTimeout: 100, //по умолчанию 300
            //poll: 1000
        }
    };



    return config;
}();
