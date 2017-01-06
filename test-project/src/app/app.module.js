"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var AppComponent_1 = require('./components/app/AppComponent');
var ElementLinkComponent_1 = require("./components/element-link/ElementLinkComponent");
var DataBindingComponent_1 = require("./components/data-binding/DataBindingComponent");
var InnerDataBindingComponent_1 = require("./components/data-binding/inner/InnerDataBindingComponent");
var classExampleComponent_1 = require("./components/class-example/classExampleComponent");
var attributeExampleComponent_1 = require("./components/attribute-example/attributeExampleComponent");
var styleExampleComponent_1 = require("./components/style-example/styleExampleComponent");
var eventExampleComponent_1 = require("./components/event-example/eventExampleComponent");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                AppComponent_1.AppComponent,
                ElementLinkComponent_1.ElementLinkComponent,
                DataBindingComponent_1.DataBindingComponent,
                InnerDataBindingComponent_1.InnerDataBindingComponent,
                classExampleComponent_1.ClassExampleComponent,
                attributeExampleComponent_1.AttributeExampleComponent,
                styleExampleComponent_1.StyleExampleComponent,
                eventExampleComponent_1.EventExampleComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule
            ],
            providers: [],
            bootstrap: [
                AppComponent_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
