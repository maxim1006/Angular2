"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ElementLinkComponent = (function () {
    function ElementLinkComponent() {
    }
    ElementLinkComponent.prototype.onButtonClick = function (element, value) {
        console.log(element);
    };
    ElementLinkComponent.prototype.getInput = function () {
        console.log(this.input.nativeElement);
        return this.input;
    };
    ElementLinkComponent.prototype.getInputs = function () {
        console.log(this.inputs._results);
        return this.inputs;
    };
    __decorate([
        core_1.ViewChild("myInput")
    ], ElementLinkComponent.prototype, "input", void 0);
    __decorate([
        //nativeElement - cвойство объекта ElementRef - который вернет декоратор
        core_1.ViewChildren("inputItem")
    ], ElementLinkComponent.prototype, "inputs", void 0);
    ElementLinkComponent = __decorate([
        core_1.Component({
            selector: "element-link",
            templateUrl: "./element-link.component.html"
        })
    ], ElementLinkComponent);
    return ElementLinkComponent;
}());
exports.ElementLinkComponent = ElementLinkComponent;
