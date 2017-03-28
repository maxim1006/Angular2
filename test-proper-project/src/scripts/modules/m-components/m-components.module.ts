import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MComponentsComponent} from "./m-components.component";
import {MAutocompleteComponent} from "./components/m-autocomplete/m-autocomplete.component";

@NgModule({
    imports: [CommonModule, HttpModule, FormsModule],
    declarations: [
        MComponentsComponent,
        MAutocompleteComponent
    ],
    exports: [MComponentsComponent],
    providers: [
    ]
})


export class MComponentsModule {
}