import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {RootComponent} from "./components/root/root.component";
import {MAutocompleteComponent} from "./components/m-autocomplete/m-autocomplete.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule],
    declarations: [RootComponent, MAutocompleteComponent],
    exports: [MAutocompleteComponent],
    providers: [
    ]
})


export class NgMainModule {
}