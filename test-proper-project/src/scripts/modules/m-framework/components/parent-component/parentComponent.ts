import {Component, ViewChild, OnInit} from "@angular/core";
import {ChildComponent} from "./child-component/childComponent";
import {ParentComponentService} from "./parent-component.service";

@Component({
    selector: "parent-component",
    templateUrl: "./parentComponent.html",
    providers: [ParentComponentService]
})

export class ParentComponent implements OnInit {

    constructor() {}

    ngOnInit() {}

    //так могу находить любой компонент в темплейте и дергать его апи, тоже самое, что и с #child, только с локальной переменной я могу это сделать только в шаблоне, а так могу и в контроллере
    @ViewChild(ChildComponent)
    private childComponent: ChildComponent;

    public childStart() {
        this.childComponent.getProp();
        this.childComponent.start();
    }

    public childStop() {
        this.childComponent.stop();
    }

}