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
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ENV = process.env.npm_lifecycle_event ? process.env.npm_lifecycle_event : '';
const isProd = ENV === 'prod';
const isStatic = ENV === 'devWebpack';
const isHmr = ENV === 'hmrWebpack';
const isTest = ENV === 'test';
const isDll = ENV === 'dll';
const isAot = ENV.includes('aot');
const isAotServer = ENV.includes('aotServer');
const isProdServer = ENV.includes('prodServer');
const isDev = isStatic || isHmr;


/**
 * Function with webpack config
 * @param webpackEnv - с помощью команды webpack --env.entry=./example.ts -p, можно сделать так, чтобы прокинуть webpackEnv внутрь вебпак
 * @param argv - An options map (argv) as the second parameter. This describes the options passed to webpack, with keys such as output-filename and optimize-minimize.
 * @returns {{}}
 */
module.exports = function makeWebpackConfig(webpackEnv, argv) {
    let webpackEnvEntry = webpackEnv && webpackEnv.entry;

    console.log(`You are in ${ENV} mode`);

    let config = {};

    if (isDev) {
        if (!fs.existsSync('./dll/ng.dll.js')) {
            throw "Can't find DLL, please use 'npm run dll' to get it.";
        }
    }

    //external dependencies
    //config.externals = [...];

    if (isProdServer) {
        if (!fs.existsSync('./dist')) {
            throw "Can't find ./dist, please use 'npm run prod' to get it.";
        }
    }

    // config.watch = !isProd;
    if (isHmr || isStatic) {
        config.devtool = 'cheap-module-eval-source-map';
    } else {
        config.devtool = 'source-map'; //это опционально, если надо и в проде подебажить, а так могу отключить
    }

    config.entry = webpackEnvEntry ? webpackEnvEntry : {
        'ng-app': './src/app/ng-main.ts', // our angular app
        // 'ng': ['./src/app/ng-polyfills.ts', './src/app/ng.ts'], //так как использую DLL нет смысла использовать чанки
        // 'result': './example.ts'  //just for check treeshaking - "module": "es2015", in tsconfig
    };

    if (isAot) {
        config.entry = webpackEnvEntry ? webpackEnvEntry : {
            'ng-app': './src/app/ng-main-aot.ts', // our angular app
        };
    }

    config.output = isTest ? {} : {
        path: path.join(__dirname, './dist'), //в проде сюда будет падать бандл
        //закомментил, так как не получается сделать и publicPath и настроить работу htmlWebpackPlugin, а для
        //HMR нужно чтобы publicPath в оутпуте совпадал с сервером
        // publicPath: '/js/', //need to be the same as in server,
        filename: '[name].js',
        // chunkFilename: '[name].js',     //нужно, чтобы сформировались чанки
        // chunkFilename: 'js/[id].-[chunkhash:8].chunk.js', //https://github.com/webpack/webpack/tree/master/examples/chunkhash
        // filename: isProd ? '[chunkhash].js' : '[name].js'
    };

    if (isAotServer || isProdServer) {
        config.entry = webpackEnvEntry ? webpackEnvEntry : {
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
                exclude: [/node_modules\/(?!(ng2-.+))/, root('src/index.html')]
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
            //     name: ['ng-app', 'ng']  //создать и запомнить в памяти ng.js, который является общей частью, состоящей из ['./src/app/ng-polyfills.ts', './src/app/ng.ts'], при этом заэкспортиться модуль ng.ts, но выполнятся оба. Потерял актульность с DLL
            // }),
            new WebpackOnBuildPlugin(function(stats) {
                console.log('build is done');
            })
        ]
            .concat(isHmr ? new webpack.HotModuleReplacementPlugin() : [])
            .concat(isDev ? [
                new HtmlWebpackPlugin({
                    template: root('src/index.html'),
                    filename: root('dist/index.html'),
                    inject: false,
                }),
                new webpack.DllReferencePlugin({
                    context: '.',
                    manifest: require(`./dll/ng-manifest.json`)
                }),
                new CopyWebpackPlugin([
                    { from: './dll'},
                    { from: './src/mocks', to: './mocks'},
                    { from: './src/assets/custom.css', to: './assets/custom.css'}
                    ])
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
                entryModule: root('src/app/app.module.ts#AppModule')
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

            //настройки для формирования денамически подгружаемого чанка, как только будет отложенно загружен чанк, так и этот чанк 1 раз будет подгружен
            // new webpack.optimize.CommonsChunkPlugin({
            //     async: "chunk",
            //     children: true,
            //     minChunks: 2
            // }),
        ];

        //репорт, запускать как _npm-command__ --report
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
        contentBase: "./dist",
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

        // historyApiFallback: {
        //     rewrites: [
        //         { from: /^\/([a-zA-Z0-9\-]*)$/, to: '/html/cart_wizard.html' },
        //     ],
        // },
        historyApiFallback: true,
        compress: true, // enable gzip compression
        quiet: false,
        inline: isHmr || isStatic || isAotServer || isProdServer,
        hot: isHmr,
        stats: "minimal",
        // stats: {
        //     assets: true,
        //     cached: true,
        //     timings: true,
        //     performance: true,
        // }, // none (or false), errors-only, minimal, normal (or true), detailed and verbose
        port: 9000,
        //модный вывод ошибок
        // overlay: {
        //     warnings: true,
        //     errors: true
        // },
        //убрать из консоли девтулов всякие лишние сообщеньки
        clientLogLevel: "none",
        watchOptions: {
            aggregateTimeout: 50, //по умолчанию 300
            //poll: 1000
            ignored: [/node_modules/ /* ,/\.less/, /\.css/ */]
        }
    };

    return config;
};



function root(__path = '.') {
    return path.join(__dirname, __path);
}
