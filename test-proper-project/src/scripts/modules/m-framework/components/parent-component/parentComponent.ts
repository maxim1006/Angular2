import {Component, ViewChild} from "@angular/core";
import {ChildComponent} from "./child-component/childComponent";

@Component({
    selector: "parent-component",
    templateUrl: "./parentComponent.html"
})

export class ParentComponent {

    //так могу находить любой компонент в темплейте и дергать его апи, тоже самое, что и с #child, только с локальной переменной я могу это сделать только в шаблоне, а так могу и в контроллере
    @ViewChild(ChildComponent)
    private childComponent: ChildComponent;

    public childStart() {
        this.childComponent.start();
    }

    public childStop() {
        this.childComponent.stop();
    }

}