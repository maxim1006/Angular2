// Helper: root() is defined at the bottom
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTestWatch = ENV === 'test-watch';
var isTest = ENV === 'test' || isTestWatch;
var isProd = ENV === 'build:prod';
var isPortal = ENV === 'build:portal';

module.exports = function makeWebpackConfig() {
    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {};

    config.watch = !isPortal;

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    config.devtool = 'source-map';

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     */
    config.entry = {
        'ng-app': './src/scripts/ng-main.ts', // our angular app
        // 'ng': './src/ng.ts',
        'ng-polyfills': './src/scripts/ng-polyfills.ts',
    };

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     */
    config.output = {
        //path: root('src/public/js'),
        // publicPath: (isProd || isPortal) ? './' : 'http://localhost:9000/',
        filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
        chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
    };
        /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    config.resolve = {
        // only discover files that have those extensions
        extensions: isPortal ? ['.ts', '.js', '.json', '.html'] : ['.ts', '.js', '.json'],
    };

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */

    config.module = {
        rules: !isPortal ? [
            // Support for .ts files.
            {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'awesome-typescript-loader?'
                        },
                        {
                            loader: 'nc-a2-html-loader',
                            options: {
                                path: path.resolve(__dirname),
                                publicPath: '../..',
                            }
                        }
                    ],
                    exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
                }
        ] :
        [{
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
            exclude: [root('src', 'markup'), /node_modules\/(?!(ng2-.+))/]
        }]
    };



    //let url = process.env.ENV;
    config.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                'IS_STATIC_MODE': !JSON.stringify(ENV)
            }
        })
    ];



    return config;
}();

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}
