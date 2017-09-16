import {Component, OnInit} from '@angular/core';
import {transition, trigger, style, animate, query} from "@angular/animations";


export const routerTransition: any = trigger('routerTransition', [
    transition('* <=> *', [
        /* order */
        /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%'})
            , { optional: true }),
        query(':enter', style({transform: 'scale(0)', opacity: 0})
            , { optional: true }),
        // /* 2 */ group([  // block executes in parallel
        query(':leave', [
            style({ transform: 'scale(1)' }),
            animate('0.5s ease-out', style({ transform: 'scale(0)', opacity: 0, "transform-origin": "-20% 0" }))
        ], { optional: true }),
        query(':enter', [
            style({ transform: 'scale(0)' , opacity: 0}),
            animate('0.3s ease-in', style({ transform: 'scale(1)', opacity: 1, "transform-origin": "20% 0" }))
        ], { optional: true }),

        // ])
    ])
]);


@Component({
    selector: 'm-rxjs',
    templateUrl: 'm-rxjs.component.html',
    animations: [ routerTransition ]
})

export class MRxjsComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}