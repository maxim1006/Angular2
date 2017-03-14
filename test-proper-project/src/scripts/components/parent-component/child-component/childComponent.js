"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ChildComponent = (function () {
    function ChildComponent() {
        this.onClickOutput = new core_1.EventEmitter();
    }
    ChildComponent.prototype.onClick = function () {
        this.onClickOutput.emit(this.inputValue);
    };
    __decorate([
        core_1.Input()
    ], ChildComponent.prototype, "inputValue", void 0);
    __decorate([
        core_1.Output()
    ], ChildComponent.prototype, "onClickOutput", void 0);
    ChildComponent = __decorate([
        core_1.Component({
            selector: "child-component",
            templateUrl: "./childComponent.html"
        })
    ], ChildComponent);
    return ChildComponent;
}());
exports.ChildComponent = ChildComponent;
