import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {MLazyComponent} from "./m-lazy.component";
import {MLazyRoutingModule} from "./m-lazy.routing";


@NgModule({
    imports: [SharedModule, MLazyRoutingModule],
    exports: [MLazyComponent],
    declarations: [MLazyComponent]
})
export class MLazyModule {}


