import {Component, HostBinding} from "@angular/core";
import {Router} from "@angular/router";



@Component({
    selector: "m-admin",
    templateUrl: "m-admin.component.html"
})
export class MAdminComponent {
    private _id: number = 0;

    public get id():number {
        return this._id;
    }

    public set id(value) {
        this._id = value;
        console.log("id is changed to: ", value);
    }

    constructor(private router: Router) {}

    submit(id: number) {
        this.router.navigate(['/admin', id, {param: 1}], { queryParams: { page: 1 }});
    }

}

