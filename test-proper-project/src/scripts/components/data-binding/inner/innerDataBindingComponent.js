"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var InnerDataBindingComponent = (function () {
    function InnerDataBindingComponent() {
        this.twoWayPropChange = new core_1.EventEmitter();
        this.onSelectItem = new core_1.EventEmitter();
        //или
        //onSelectItem = new EventEmitter();
        this.onTwoWayClick = new core_1.EventEmitter();
    }
    //или
    //onTwoWayClick = new EventEmitter();
    InnerDataBindingComponent.prototype.twoWayClick = function (string, string1) {
        this.onTwoWayClick.emit([string, string1]);
    };
    ;
    InnerDataBindingComponent.prototype.selectItem = function (item) {
        //this.selectedItem = item;
        //this.onSelectItem.emit(item);
        this.twoWayPropChange.emit(item);
    };
    __decorate([
        core_1.Input()
    ], InnerDataBindingComponent.prototype, "prop", void 0);
    __decorate([
        core_1.Input()
    ], InnerDataBindingComponent.prototype, "twoWayProp", void 0);
    __decorate([
        core_1.Output()
    ], InnerDataBindingComponent.prototype, "twoWayPropChange", void 0);
    __decorate([
        core_1.Output()
    ], InnerDataBindingComponent.prototype, "onSelectItem", void 0);
    __decorate([
        core_1.Output()
    ], InnerDataBindingComponent.prototype, "onTwoWayClick", void 0);
    InnerDataBindingComponent = __decorate([
        core_1.Component({
            selector: "inner-data-binding",
            templateUrl: "./innerDataBindingComponent.html"
        })
    ], InnerDataBindingComponent);
    return InnerDataBindingComponent;
}());
exports.InnerDataBindingComponent = InnerDataBindingComponent;
