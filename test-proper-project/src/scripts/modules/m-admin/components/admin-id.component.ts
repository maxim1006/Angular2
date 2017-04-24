import {
    Component, OnInit, HostBinding, AnimationEntryMetadata, trigger, state, style, transition, animate,
    Inject
} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Http} from "@angular/http";
import {domenToken} from "../../shared/tokens/tokens";
import {FamilyMember} from "../../m-http/m-http.component";



export const slideInDownAnimation: AnimationEntryMetadata =
    trigger('routeAnimation', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0)'
            })
        ),
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateX(-100%)'
            }),
            animate('0.2s ease-in')
        ]),
        transition(':leave', [
            animate('0.5s ease-out', style({
                opacity: 0,
                transform: 'translateX(-100%)'
            }))
        ])
    ]);



@Component({
    selector: "admin-id",
    template: `
        Your id is: {{params.id}}<br />
        param is: {{params.param}}
        Your data is: {{family | json}}
    `,
    animations: [ slideInDownAnimation ]
})
export class AdminIdComponent implements OnInit {
    public family;
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display')   display = 'block';
    @HostBinding('style.position')  position = 'absolute';
    @HostBinding('style.transform')  initTransform = 'translateY(100%)';

    params: Params;
    constructor(private route: ActivatedRoute,
                private http: Http,
                @Inject(domenToken) private _domenToken
    ) {}


    ngOnInit() {
        this.params = this.route.snapshot.params;
        console.log(this.params);

        this.route.params.switchMap(
                (params: Params) => {
                    console.log(params['id']);
                    return this.http.get(`http://localhost:9001/mocks/family` + params['id'] + '.json')
                }
            )
            .subscribe((family) => {
                 this.family = family.json();
            }, (err) => {
                this.family = 'There is no data fo you';
            });
    }
}