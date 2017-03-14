/**
 * Created by alkr1115 on 10.02.2017.
 */
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {window} from "@angular/platform-browser/src/facade/browser";
import {RestService} from "./rest.service";
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from "@angular/http";

@Injectable()
export class TelenetHttpService {
    private _portletName: string;

    constructor(private _http: Http, private _restService: RestService) {}


    get portletName(): string {
        return this._portletName;
    }

    set portletName(value: string) {
        this._portletName = value;
    }

    setHeadersForPost(headers: Headers) {
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json, text/javascript, */*; q=0.01');
        headers.append('X-Csrf-Token', window.Liferay ? window.Liferay.authToken : "");
    }

    post(method: string, data: any) {
        let headers = new Headers();
        let body = new URLSearchParams();

        this.setHeadersForPost(headers);

        for (var field in data) {
            if (data.hasOwnProperty(field)) {
                if(data[field]){
                    body.append(field, typeof data[field] === "string" || Array.isArray(data[field]) ? data[field] : JSON.stringify(data[field]) );
                }
            }
        }

        return this._http.post(this._restService.getPath(this._restService.findPortlet(this._portletName),
            {}, method), body.toString(), {
            headers: headers
        }).map(res => {
                return res.json();
            }).catch((error: any)=> { return Observable.throw(error);});
    }
}
