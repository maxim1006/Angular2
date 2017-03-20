import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MFormComponent} from "./components/m-form/m-form.component";
import {TField} from "./components/t-field/t-field.component";

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, ReactiveFormsModule],
    declarations: [MFormComponent, TField],
    exports: [MFormComponent],
    providers: [
    ]
})
export class MFormsModule {
}