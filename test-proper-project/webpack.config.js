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
const isStatic = ENV === 'devWebpack';
const isHmr = ENV === 'hmrWebpack';
const isTest = ENV === 'test';



module.exports = function makeWebpackConfig(options = {}) {
    let config = {};

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
        path: path.join(__dirname, './src/public/js'), //в проде сюда будет падать бандл
        filename: '[name].js'
        // filename: isProd ? '[hash].js' : '[name].js'
    };

    if (isHmr) {
        config.output['path'] =  path.join(__dirname, './src/public'); //need to be the same as in server
        config.output['publicPath'] =  "/js/"; //need to be the same as in server
    }



    config.resolve = {
        // only discover files that have those extensions
        extensions: ['.ts', '.js', '.json', '.html'],
    };



    //посмотреть размер созданных файлов, можно использовать stats параметр в devServer
    // config.performance = {
    //     hints: "warning"
    // };



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
                ].concat(isHmr ? '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd : []),
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
                    'STATIC': isStatic,
                    'HMR': isHmr,
                    'PROD': isProd
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['ng']  //создать и запомнить в памяти ng.js, который является общей частью, состоящей из ['./src/scripts/ng-polyfills.ts', './src/scripts/ng.ts'], при этом заэкспортиться модуль ng.ts, но выполнятся оба.
            }),
            new WebpackOnBuildPlugin(function(stats) {
                console.log('build is done');
            })
        ].concat(isHmr ? new webpack.HotModuleReplacementPlugin() : []);
    }




    // if (isHmr) {
    //     config.plugins.push(
    //         new DllReferencePlugin({
    //             context: '.',
    //             manifest: require(`./dll/ng-manifest.json`)
    //         }),
    //         new HtmlWebpackPlugin({
    //             template: 'src/public/index.html',
    //             inject: false
    //         })
    //     );
    // }




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
        contentBase: "./src/public",
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
        inline: isHmr || isStatic,
        hot: isHmr,
        stats: {
            assets: true,
            cached: true,
            timings: true,
            performance: true,
        }, // none (or false), errors-only, minimal, normal (or true), detailed and verbose
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
