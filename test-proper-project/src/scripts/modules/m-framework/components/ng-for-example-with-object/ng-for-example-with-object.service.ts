import { Injectable, Inject } from "@angular/core";
import { Http  } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {domenToken} from "../../../shared/tokens/tokens";


@Injectable() //дает возможность инжектировать что-нибудь.
export class NgForExampleWithObjectService {
    constructor(
        @Inject(domenToken) private _domenToken, //могу так заинжектить, так как сказал об этом в модуле
        private _http: Http
    ) {}

    public getFamily():Observable<any> {

        return this._http.get(`${this._domenToken}familyObj.json`)
               .map(res => {
                   return res.json();
                   //console.log(res.json());
               })
               .catch(err => {
                   console.log(err);
                   return Observable.of([]);
                   //return Observable.throw(err);
               });

        // return [
        //     {
        //         name: "Max",
        //         age: 29,
        //         sex: "male"
        //     },
        //     {
        //         name: "Aliya",
        //         age: 30,
        //         sex: "female"
        //     },
        //     {
        //         name: "Anton",
        //         age: 30,
        //         sex: "male"
        //     }
        // ];

    }

}