import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
    selector: "inner-data-binding",
    templateUrl: "./innerDataBindingComponent.html"
})

export class InnerDataBindingComponent implements OnInit{
    public selectedItem:string;

    public constructor() {
    }

    ngOnInit() {
        this.prop.name = "prop inner";
    }

    @Input()
    public prop;

    @Input()
    public twoWayProp;

    @Output()
    public twoWayPropChange = new EventEmitter();

    @Output()
    onTwoWayClick: EventEmitter<string[]> = new EventEmitter<string[]>();

    @Output()
    onSelectItem: EventEmitter<string> = new EventEmitter<string>();

    public twoWayClick(string) {
        this.twoWayPropChange.emit(string);
    };

    public selectItem(item):void {
        this.selectedItem = item;
        this.onSelectItem.emit(item);
    }
}