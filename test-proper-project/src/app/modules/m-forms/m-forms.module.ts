import {NgModule, forwardRef} from "@angular/core";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {TField} from "./components/t-field/t-field.component";
import {MFormComponent} from "./m-form.component";
import {SharedModule} from "../shared/shared.module";
import {MFormControlComponent} from "./components/form-control/form-control.component";

//ControlValueAccessor - его надо реализовать, чтобы получить кастомный формКонтрол

@NgModule({
    imports: [SharedModule, HttpModule, FormsModule, ReactiveFormsModule],
    declarations: [MFormComponent, TField, MFormControlComponent],
    exports: [MFormComponent],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // useExisting: MFormControlComponent,
            useExisting: forwardRef(() => MFormControlComponent), //- делаю так если задаю класс после вызова, чтобы избежать ошибки компиляции
            multi: true
        }
    ]
})
export class MFormsModule {
}