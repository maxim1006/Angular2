"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var StyleExampleComponent = (function () {
    function StyleExampleComponent() {
        this.imageUrl = "http://grinz.ru/jquery/imagePreloading/images/1.jpg";
    }
    StyleExampleComponent.prototype.getStyles = function () {
        return {
            width: "10%",
            color: "red",
            fontSize: "20px",
            transform: "translate(10px, 0)"
        };
    };
    StyleExampleComponent = __decorate([
        core_1.Component({
            selector: "style-example",
            templateUrl: "./styleExampleComponent.html"
        })
    ], StyleExampleComponent);
    return StyleExampleComponent;
}());
exports.StyleExampleComponent = StyleExampleComponent;
