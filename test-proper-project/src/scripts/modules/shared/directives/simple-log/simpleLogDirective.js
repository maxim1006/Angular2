"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SimpleLogDirective = (function () {
    function SimpleLogDirective() {
    }
    SimpleLogDirective.prototype.onInput = function (e) {
        var el = e.target, //assertion, те я понимаю, что это не просто таргет, а именно инпут элемент
        value = el.value;
        this.isValid = value === 'valid';
        console.log(el.value);
    };
    __decorate([
        core_1.HostBinding('class._valid')
    ], SimpleLogDirective.prototype, "isValid", void 0);
    __decorate([
        core_1.HostListener('input', ['$event'])
    ], SimpleLogDirective.prototype, "onInput", null);
    SimpleLogDirective = __decorate([
        core_1.Directive({
            selector: '[simple-log]',
        })
    ], SimpleLogDirective);
    return SimpleLogDirective;
}());
exports.SimpleLogDirective = SimpleLogDirective;
