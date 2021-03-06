import {Component,Input,Output,EventEmitter} from "@angular/core";

@Component({
    selector: "m-checkbox",
    styles: [require("./m-checkbox.component.less")],
    templateUrl: "m-checkbox.component.html",
})

export class MCheckboxComponent {
    @Input()
    checked: boolean;

    @Input()
    text: string = '';

    @Output() checkedChange = new EventEmitter();

    check() {
        this.checked = !this.checked;
        this.checkedChange.emit(this.checked)
    }
}