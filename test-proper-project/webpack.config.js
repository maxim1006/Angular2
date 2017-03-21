// Helper: root() is defined at the bottom
var path = require('path');
var webpack = require('webpack');



/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTestWatch = ENV === 'test-watch';
var isTest = ENV === 'test' || isTestWatch;
var isProd = ENV === 'build:prod';


module.exports = function makeWebpackConfig() {
    var config = {};

    // config.watch = !isProd;
    config.devtool = 'source-map';



    config.entry = {
        'ng-app': './src/scripts/ng-main.ts', // our angular app
        'ng-polyfills': './src/scripts/ng-polyfills.ts',
        'ng': './src/scripts/ng.ts',
    };



    config.output = {
        path: path.join(__dirname, './src/'),
        filename: isProd ? 'markup/js/[name].[hash].js' : 'markup/js/[name].js',
        // chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
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
                'IS_STATIC_MODE': !JSON.stringify(ENV)
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['ng', 'ng-polyfills']
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
