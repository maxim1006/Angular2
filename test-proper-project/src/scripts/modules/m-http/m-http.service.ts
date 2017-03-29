import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {domenToken} from "../shared/tokens/tokens";

@Injectable()
export class MHttpService {
    private _data: any;
    constructor(private _http: Http) {}

    getData():Observable<any> {
        if(!this._data){
            this._data = this._http.get(`${domenToken}family.json`)
                .delay(2000)
                .map (
                    (data) => {
                        return data.json()
                    },
                    (e) => {
                        console.log(e);
                        return Observable.throw(e);
                    }
                )
                .publishReplay(1)
                .refCount();
        }
        return this._data;
    }
}




