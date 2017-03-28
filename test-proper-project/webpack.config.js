// Helper: root() is defined at the bottom
var path = require('path');
var webpack = require('webpack');



/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'prod';
var isStatic = ENV === 'dev';
var isHmr = ENV === 'hmr';
var isTest = ENV === 'test';



module.exports = function makeWebpackConfig() {
    var config = {};

    // config.watch = !isProd;
    config.devtool = 'source-map';



    config.entry = {
        'ng-app': './src/scripts/ng-main.ts', // our angular app
        'ng': ['./src/scripts/ng-polyfills.ts', './src/scripts/ng.ts'],
    };



    config.output = {
        path: path.join(__dirname, './src/'),
        filename: isProd ? 'markup/js/[name].[hash].js' : 'markup/js/[name].js'
    };



    config.resolve = {
        // only discover files that have those extensions
        extensions: ['.ts', '.js', '.json', '.html'],
    };



    config.module = {
        rules: [{
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
        }]
    };

    //let url = process.env.ENV;
    config.plugins = [
        new webpack.NoErrorsPlugin(), //оптимизация при ошибках
        new webpack.DefinePlugin({
            'process.env': {
                'IS_STATIC_MODE': ENV === 'devWebpack',
                'HMR': ENV === 'hmrWebpack'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['ng']  //создать и запомнить в памяти ng.js, который является общей частью, состоящей из ['./src/scripts/ng-polyfills.ts', './src/scripts/ng.ts'], при этом заэкспортиться модуль ng.ts, но выполнятся оба.
        }),
    ];



    //dev server
    config.devServer = {
        contentBase: path.join(__dirname, "./src"),
        // staticOptions: {
        //     redirect: true
        // },
        historyApiFallback: true,
        compress: false, // enable gzip compression
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
