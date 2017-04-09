import {Injectable} from "@angular/core";
import {Subject} from "rxjs";



@Injectable()
export class ParentComponentService {

    private serviceProp = new Subject<string>();
    serviceProp$ = this.serviceProp.asObservable();

    public getProp() {
        this.serviceProp.next("prop from service");
    }
}