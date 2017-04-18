import {Component, HostBinding} from "@angular/core";
import {Router} from "@angular/router";



@Component({
    selector: "m-admin",
    templateUrl: "m-admin.component.html"
})
export class MAdminComponent {
    private _id: number = 0;

    private get id():number {
        return this._id;
    }

    private set id(value) {
        this._id = value;
        console.log("id is changed to: ", value);
    }

    constructor(private router: Router) {}

    submit(id: string) {
        console.log(id);
        this.router.navigate(['/admin', id, {param: 1}]);
    }

}

