import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: "inner-data-binding",
    templateUrl: "./innerDataBindingComponent.html"
})

export class InnerDataBindingComponent {
    public selectedItem:string;

    public constructor() {
    }

    @Input()
    public prop;

    @Input()
    public twoWayProp;

    @Output()
    twoWayPropChange = new EventEmitter();

    @Output()
    onTwoWayClick: EventEmitter<string[]> = new EventEmitter<string[]>();
    //или
    //onTwoWayClick = new EventEmitter();

    @Output()
    onSelectItem: EventEmitter<string> = new EventEmitter<string>();

    public twoWayClick(string, string1) {
        this.onTwoWayClick.emit([string, string1]);
    };

    public selectItem(item):void {
        this.selectedItem = item;
        this.onSelectItem.emit(item);
        this.twoWayPropChange.emit(item);
    }
}