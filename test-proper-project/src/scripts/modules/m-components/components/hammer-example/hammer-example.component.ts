import {Component, HostBinding} from "@angular/core";

@Component({
    selector: "hammer-example",
    templateUrl: "./hammer-example.component.html"
})
export class HammerExampleComponent {
    isSwiped: boolean;

    @HostBinding('class') componentClass: string = 'hammer-example';

    panString: string = '';

    onTap(event: any) {
        console.log(event, ' tap event');
        this.panString += ' taped!';
    }

    onSwipe(event: any) {
        console.log(event, ' swipe event');
        this.isSwiped = !this.isSwiped;
    }
}