import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TField} from "./components/t-field/t-field.component";
import {MFormComponent} from "./m-form.component";

@NgModule({
    imports: [CommonModule, HttpModule, FormsModule, ReactiveFormsModule],
    declarations: [MFormComponent, TField],
    exports: [MFormComponent],
    providers: [
    ]
})
export class MFormsModule {
}