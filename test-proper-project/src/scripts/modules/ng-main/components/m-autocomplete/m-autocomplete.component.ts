import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector: "m-autocomplete",
    templateUrl: "./m-autocomplete.component.html"
})

export class MAutocompleteComponent implements OnInit {

    @Input()
    styleClass: string;

    @Input()
    items: any;

    @Input()
    currentItem: any;

    @Output()
    currentItemChange = new EventEmitter();

    private opened: boolean;
    private currentValue: string;
    private filteredItems: any = [];

    constructor() {
    }

    ngOnInit() {
        console.log(this.items);
        this.filteredItems = this.items && this.items.slice()
    }

    filterResults() {
        if (this.currentValue) {
            this.filteredItems = this.items.filter(item => {
                return (item.name ? item.name.toLowerCase() :
                        item.toLowerCase()).indexOf(this.currentValue.toLowerCase()) !== -1
            });
        } else {
            this.filteredItems = this.items;
        }
    }

    onButtonClick() {
        this.filterResults();
        this.opened = !this.opened;
    }

    onInputChange(value:string) {
        this.currentValue = value;
        this.filterResults();

        console.log(this.filteredItems);
        console.log(this.currentValue, "this.currentValue ");

        if (this.filteredItems.length && !this.opened) {
            this.opened = true;
        } 
    }

    setCurrentItem(item) {
        this.currentItem = item;
        this.currentValue = item.name || item;
        this.opened = false;

        this.currentItemChange.emit(this.currentItem);
    }

}