import {ChangeDetectorRef, Component, HostBinding, Inject, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {domenToken} from "../../shared/tokens/tokens";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NavigationEnd, Router} from "@angular/router/";
import {switchMap} from "rxjs/internal/operators";
import {HttpClient} from "@angular/common/http";


export const slideInDownAnimation: any =
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
    routerSubscription: any;
    public family;
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display')   display = 'block';
    @HostBinding('style.position')  position = 'absolute';
    @HostBinding('style.transform')  initTransform = 'translateY(100%)';

    params: Params;
    constructor(private route: ActivatedRoute,
                private http: HttpClient,
                private router: Router,
                private cdr: ChangeDetectorRef,
                @Inject(domenToken) private _domenToken
    ) {}


    ngOnInit() {
        this.params = this.route.snapshot.params;
        console.log(this.params);

        this.route.params.pipe(
                switchMap(
                    (params: Params) => {
                        console.log(params['id']);
                        return this.http.get(`http://localhost:9000/mocks/family` + params['id'] + '.json')
                    }
                )
            )
            .subscribe((family) => {
                 this.family = family;
            }, (err) => {
                this.family = 'There is no data fo you';
            });
    }

    ngAfterViewInit() {
        this.routerSubscription = this.router.events.subscribe((url:any) => {
            if (url instanceof NavigationEnd) {
                console.log(url.url);
                this.cdr.detectChanges();
            }
        });
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }
}