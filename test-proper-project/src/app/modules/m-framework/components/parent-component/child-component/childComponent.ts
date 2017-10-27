import {Component, Input, EventEmitter, Output, OnInit, OnDestroy} from "@angular/core";
import {ParentComponentService} from "../parent-component.service";
import {Subscription} from "rxjs";

@Component({
    selector: "child-component",
    templateUrl: "./childComponent.html"
})

export class ChildComponent implements OnInit, OnDestroy {

    childComponentModel = "";

    @Input()
    valueFromParent: any;

    @Output()
    valueFromParentChange: EventEmitter<any> = new EventEmitter();

    @Input()
    public inputValue:string;

    @Output()
    onClickOutput: EventEmitter<string> = new EventEmitter();
    private subscription: Subscription;
    
    constructor(private parentComponentService: ParentComponentService) {}
    
    ngOnInit() {
        this.subscription = this.parentComponentService.serviceProp$.subscribe(
            (value) => {
                console.log(value);
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getProp() {
        this.parentComponentService.getProp();
    }

    public onClick():void {
        this.onClickOutput.emit(this.inputValue);
    }

    public start() {
        console.log("child component start");
    }

    public stop() {
        console.log("child component stop");
    }

    public valueChange(data: string) {
        console.log(data, "data from child component input");
    }

    public onCheckboxValueChange(event: Event) {
        // console.dir(event);
        this.valueFromParent.arr[0].checked = event.srcElement["checked"];
        // console.dir(this.valueFromParent);
        this.valueFromParentChange.emit(this.valueFromParent);
    }


}