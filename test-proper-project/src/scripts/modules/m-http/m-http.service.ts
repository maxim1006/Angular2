import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {domenToken} from "../shared/tokens/tokens";

@Injectable()
export class MHttpService {
    constructor(private _http: Http) {}

    getData():Observable<any> {
        return this._http.get(`${domenToken}family.json`)
            .map (
                (data) => {
                    return data.json()
                },
                (e) => {
                    console.log(e);
                    return Observable.throw(e);
                }
            ).publishLast()
            .refCount()
    }
}




