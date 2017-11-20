import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
    selector: 'slide-toggle',
    template: `
        <h2 (tap)="toggled = !toggled">Slide toggle directive</h2>
        {{toggled}}
        <div class="slide-toggle__inner" [(slideToggle)]="toggled">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam at blanditiis deleniti deserunt doloremque doloribus illum iusto natus necessitatibus obcaecati odit perferendis provident quibusdam quidem, repellendus, reprehenderit repudiandae sequi.</div>
    `
})

export class MSlideToggleComponent implements OnInit {
    @HostBinding('class')
    public class: string = "slide-toggle";

    public toggled: boolean = true;

    constructor() {
    }

    ngOnInit() {
    }
}