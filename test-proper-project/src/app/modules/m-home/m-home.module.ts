import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {MHomeComponent} from "./m-home.component";

@NgModule({
    imports: [SharedModule],
    exports: [MHomeComponent],
    declarations: [MHomeComponent],
})
export class MHomeModule {

}