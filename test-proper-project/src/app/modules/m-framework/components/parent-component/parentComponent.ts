import {Component, ViewChild, OnInit} from "@angular/core";
import {ChildComponent} from "./child-component/childComponent";
import {ParentComponentService} from "./parent-component.service";

@Component({
    selector: "parent-component",
    templateUrl: "./parentComponent.html",
    providers: [ParentComponentService]
})

export class ParentComponent implements OnInit {
    _parentValue: any;

    public inputValue: string;
    public inputValueFromInnerComponent: string;

    public set parentValue(value) {
        console.log('parentValue', value);
        this._parentValue = value;
    }

    public get parentValue() {
        return this._parentValue;
    }

    constructor() {}

    ngOnInit() {
        this.parentValue = {
            arr: [
                {
                    checked: true
                }
            ]
        }
    }

    //так могу находить любой компонент в темплейте и дергать его апи, тоже самое, что и с #child, только с локальной переменной я могу это сделать только в шаблоне, а так могу и в контроллере
    @ViewChild('child')
    private childComponent: ChildComponent;

    public childStart() {
        this.childComponent.getProp();
        this.childComponent.start();
    }

    public childStop() {
        this.childComponent.stop();
    }

}