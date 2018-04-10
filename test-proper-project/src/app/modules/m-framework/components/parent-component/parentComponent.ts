import {Component, ViewChild, OnInit, ElementRef} from "@angular/core";
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
        };

        console.log(this.childComponent, ' this.childComponent');
    }

    //так могу находить любой компонент в темплейте и дергать его апи, тоже самое, что и с #child, только с локальной переменной я могу это сделать только в шаблоне, а так могу и в контроллере
    //@ViewChild('child', {read: ElementRef}) //если кастомный элемент, то пишу так, чтобы получить его дом элемент, даже п
    @ViewChild('child')
    private childComponent: ChildComponent;

    public childStart() {
        this.childComponent.getProp();
        this.childComponent.start();
    }

    public childStop() {
        this.childComponent.stop();
    }

    public functionForChild(message: string): void {
        console.log(message);
    }

}