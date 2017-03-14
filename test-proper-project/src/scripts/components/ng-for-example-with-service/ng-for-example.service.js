"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var tokens_1 = require('../../tokens/tokens');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/of');
var Observable_1 = require('rxjs/Observable');
var NgForExampleService = (function () {
    function NgForExampleService(_domenToken, //могу так заинжектить, так как сказал об этом в модуле
        _http) {
        this._domenToken = _domenToken;
        this._http = _http;
    }
    NgForExampleService.prototype.getFamily = function () {
        return this._http.get(this._domenToken + "family.json")
            .map(function (res) {
            return res.json();
            //console.log(res.json());
        })
            .catch(function (err) {
            return Observable_1.Observable.of([]);
            //return Observable.throw(err);
        });
        // return [
        //     {
        //         name: "Max",
        //         age: 29,
        //         sex: "male"
        //     },
        //     {
        //         name: "Aliya",
        //         age: 30,
        //         sex: "female"
        //     },
        //     {
        //         name: "Anton",
        //         age: 30,
        //         sex: "male"
        //     }
        // ];
    };
    NgForExampleService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(tokens_1.domenToken))
    ], NgForExampleService);
    return NgForExampleService;
}());
exports.NgForExampleService = NgForExampleService;
