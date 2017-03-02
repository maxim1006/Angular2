module.exports = {
    devtool: "inline-source-map",
    resolve: {
        extensions: [".js", ".ts"],
        modules: ["./src", "./node_modules"]
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: [
                {
                    loader: "awesome-typescript-loader",
                    query: {
                        // use inline sourcemaps for "karma-remap-coverage" reporter
                        sourceMap: false,
                        inlineSourceMap: true,
                        compilerOptions: {
                            // Remove TypeScript helpers to be injected
                            // below by DefinePlugin
                            removeComments: true

                        }
                    }
                },
                "angular2-template-loader"
            ]
        }, {
            test: /\.html$/,
            loader: "html-loader"
        }, {
            test: /\.css$/,
            use: ['to-string-loader', 'css-loader']
        }, {
            test: /\.(png|jpe?g|gif|eot|ico)$/,
            loader: "file-loader?name=assets/[name].[ext]"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader"
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader"
        }, {
            enforce: "post",
            test: /\.(js|ts)$/,
            loader: "istanbul-instrumenter-loader",
            exclude: [
                /\.(e2e|spec)\.ts$/,
                /node_modules/,
                /karma-test-shim.js/
            ]
        }]
    },
    performance: {
        hints: false
    },
    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
        global: true,
        process: false,
        crypto: "empty",
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};