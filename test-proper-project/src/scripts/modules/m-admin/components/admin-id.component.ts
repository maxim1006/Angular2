import {Component, OnInit, HostBinding, AnimationEntryMetadata, trigger, state, style, transition, animate} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";



export const slideInDownAnimation: AnimationEntryMetadata =
    trigger('routeAnimation', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateY(0)'
            })
        ),
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateY(100%)'
            }),
            animate('0.2s ease-in')
        ]),
        transition(':leave', [
            animate('0.5s ease-out', style({
                opacity: 0,
                transform: 'translateY(100%)'
            }))
        ])
    ]);



@Component({
    selector: "admin-id",
    template: `
        Your id is: {{params.id}}<br />
        param is: {{params.param}}
    `,
    animations: [ slideInDownAnimation ]
})
export class AdminIdComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display')   display = 'block';
    @HostBinding('style.position')  position = 'absolute';
    @HostBinding('style.transform')  initTransform = 'translateY(100%)';

    params: Params;
    constructor(private route: ActivatedRoute) {}


    ngOnInit() {
        this.params = this.route.snapshot.params;

        console.log(this.route.snapshot);
    }
}