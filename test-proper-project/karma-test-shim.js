Error.stackTraceLimit = Infinity;

require("core-js/es6");
require("core-js/es7/reflect");
require("zone.js/dist/zone");
require("zone.js/dist/long-stack-trace-zone");
require("zone.js/dist/proxy");
require("zone.js/dist/sync-test");
require("zone.js/dist/jasmine-patch");
require("zone.js/dist/async-test");
require("zone.js/dist/fake-async-test");

var testing = require("@angular/core/testing");
var browser = require("@angular/platform-browser-dynamic/testing");

var testContext = require.context("./test/unit", true, /\.spec\.ts/);
testContext.keys().forEach(testContext);

testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());