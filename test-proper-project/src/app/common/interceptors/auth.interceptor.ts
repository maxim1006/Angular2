import 'rxjs/add/operator/do';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Router} from '@angular/router';
import {Injectable, Injector} from "@angular/core";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private injector: Injector) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let self = this;

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                // because of cycle injection of services
                // let someService: SomeService = self.injector.get(SomeService);

                console.log("401 error", err);

                self.router.navigate(["/"]);
            }
        });
    }
}
