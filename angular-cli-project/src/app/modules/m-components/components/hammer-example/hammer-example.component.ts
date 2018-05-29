import {Component, HostBinding} from "@angular/core";

@Component({
    selector: "hammer-example",
    templateUrl: "./hammer-example.component.html"
})
export class HammerExampleComponent {
    panString: string = '';
    isSwiped: boolean;

    private _styleClass: string = '';

    @HostBinding('class')
    get styleClass() {
        return this._styleClass || 'hammer-example';
    }

    set styleClass(value: string) {
         this._styleClass = 'hammer-example' + value;
    }

    onTap(event: any) {
        this.panString += ' taped!';
        this.styleClass = this.panString;
    }

    onSwipe(event: any) {
        console.log(event, ' swipe event');
        this.isSwiped = !this.isSwiped;
    }

    ngOnInit() {
    }
}