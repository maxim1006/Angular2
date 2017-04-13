import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MComponentsComponent} from "./m-components.component";
import {MAutocompleteComponent} from "./components/m-autocomplete/m-autocomplete.component";
import {ContentEditableComponent} from "./components/content-editable/content-editable.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [CommonModule, HttpModule, FormsModule, SharedModule],
    declarations: [
        MComponentsComponent,
        MAutocompleteComponent,
        ContentEditableComponent
    ],
    exports: [MComponentsComponent],
    providers: []
})


export class MComponentsModule {
}