//Этот сервис нужен для того чтобы инициализировать приложение лишь после загрузки каких-то данных,
//затем в AppModule описываю APP_INITIALIZER

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class RouteService {

    routes: Routes;

    constructor(protected http: Http) {
    }

    init(): Promise<Routes> {
        let o = this.http.get("/mocks/route.json")
            .map(res => res.json()).toPromise();

        o.then(routes => {
            this.routes = routes;
            console.log(this.routes, ' this is the route.json, that loaded before app had initialized');
        });

        return o;
    }
}

export interface Routes {
    domain: string;
    gateWay: string;
    identityProvider: string;
}