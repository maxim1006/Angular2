import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {MAdminComponent} from "./m-admin.component";
import {MAdminGuardService} from "./m-admin-guard.service";
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminIdComponent} from "./components/admin-id.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule,
        FormsModule
    ],
    declarations: [
        MAdminComponent,
        AdminIdComponent
    ],
    providers: [MAdminGuardService]
})
export class MAdminModule {}