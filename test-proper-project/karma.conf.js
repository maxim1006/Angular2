const webpackConfig = require("./webpack.test.config.js");

module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine", "source-map-support"],
        plugins: [
            require("karma-jasmine"),
            require("karma-phantomjs-launcher"),
            require("karma-chrome-launcher"),
            require("karma-junit-reporter"),
            require("karma-coverage"),
            require("karma-remap-coverage"),
            require("karma-webpack"),
            require("karma-mocha-reporter"),
            require("karma-source-map-support")
        ],
        files: [
            {pattern: "./karma-test-shim.js", watched: false}
        ],
        reporters: ["mocha", "coverage", "remap-coverage", "junit"],
        preprocessors: {
            "./karma-test-shim.js": ["webpack"]
        },
        webpack: webpackConfig,
        coverageReporter: {
            type: "in-memory"
        },
        remapCoverageReporter: {
            "text-summary": null,
            html: "./coverage/html",
            cobertura: "./coverage/cobertura.xml"
        },
        junitReporter: {
            outputDir: "target/surefire-reports"
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ["PhantomJS"],
        singleRun: true,
        //the following timeouts is need because we run tests in different environments with different performance
        //(timeouts=default * 2)
        captureTimeout: 20000,
        browserDisconnectTimeout: 4000,
        browserDisconnectTolerance: 2,
        browserNoActivityTimeout: 20000,
        concurrency: Infinity
    })
};