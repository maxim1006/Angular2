"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require('rxjs/add/observable/from');
var RxjsExampleComponent = (function () {
    function RxjsExampleComponent() {
        this.arr = ['Hi', 'rxjs', '!!!'];
        //создаю observable array
        this.sequence = Observable_1.Observable.from(this.arr);
        console.log(this.sequence);
        this.sequence.subscribe(function (res) { return console.log(res); });
    }
    RxjsExampleComponent.prototype.addItemToArray = function (value) {
        this.arr.push(value);
        this.sequence.subscribe(function (res) { return console.log(res); });
    };
    RxjsExampleComponent = __decorate([
        core_1.Component({
            selector: "rxjs-example",
            templateUrl: "./rxjsExampleComponent.html"
        })
    ], RxjsExampleComponent);
    return RxjsExampleComponent;
}());
exports.RxjsExampleComponent = RxjsExampleComponent;
