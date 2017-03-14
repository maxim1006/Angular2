"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//import { Component, OnInit } from "@angular/core";
var core_1 = require("@angular/core"); //это расширенная запись
var ng_for_example_service_1 = require("./ng-for-example.service");
var NgforExampleComponent = (function () {
    function NgforExampleComponent(ngForExampleService) {
        this.ngForExampleService = ngForExampleService;
    }
    //  constructor(
    //      @Inject('family') private ngForExampleService,
    //      @Inject('url') private url,
    //      @Inject('tokens') private tokens
    //  ) {} //это расширенная запись
    NgforExampleComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.dir(this.ngForExampleService.getFamily());
        this.ngForExampleService.getFamily().subscribe(function (family) {
            // console.log(family);
            _this.family = family;
        });
        //console.log(this.tokens.domenToken);
    };
    NgforExampleComponent = __decorate([
        core_1.Component({
            selector: "ng-for-example",
            templateUrl: "./ng-for-example.html",
            providers: [ng_for_example_service_1.NgForExampleService]
        })
    ], NgforExampleComponent);
    return NgforExampleComponent;
}());
exports.NgforExampleComponent = NgforExampleComponent;
