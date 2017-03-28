"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DataBindingComponent = (function () {
    function DataBindingComponent() {
        //one-way binding
        this.image = "http://grinz.ru/jquery/imagePreloading/images/14.jpg";
        this.image1 = "http://grinz.ru/jquery/imagePreloading/images/11.jpg";
        this.prop = {
            name: 'Property from parent component'
        };
    }
    DataBindingComponent.prototype.ngOnInit = function () {
        var _this = this;
        setInterval(function () {
            console.log(_this.prop);
        }, 3000);
    };
    DataBindingComponent.prototype.onImage1Click = function () {
        console.log("image1 clicked!");
    };
    DataBindingComponent.prototype.onModelChange = function () {
        console.log(this.inputValue);
    };
    DataBindingComponent.prototype.onTwoWayClick = function (event) {
        console.log(event);
        this.inputValue = event[0];
    };
    DataBindingComponent.prototype.onSelectItem = function (event) {
        console.log('get item in parent directive: ', event);
    };
    DataBindingComponent = __decorate([
        core_1.Component({
            selector: "data-binding",
            templateUrl: "./dataBindingComponent.html"
        })
    ], DataBindingComponent);
    return DataBindingComponent;
}());
exports.DataBindingComponent = DataBindingComponent;
