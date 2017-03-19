import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from "@angular/forms";
import {nameValidator} from "../../validators/validators";
import {ValidationConstants} from "../../../../constants/validation.constant";

@Component({
    selector: "m-form",
    templateUrl: "./m-form.component.html"
})

export class MFormComponent implements OnInit {
    private myForm: FormGroup;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            'name': new FormControl(
                {
                    //исходный value в input
                    value: null,
                    //disable state
                    disabled: false
                },
                Validators.compose([Validators.required, nameValidator, Validators.maxLength(10)])
            ), //пример с кастомной валидацией
            'surname': new FormControl(
                {
                    value: null,
                    disabled: true
                },
                Validators.compose([Validators.required, nameValidator, Validators.maxLength(10)])
            ),
            'phone': new FormControl(
                {
                    value: null,
                    disabled: false
                },
                Validators.compose([Validators.pattern(ValidationConstants.PHONE_NUMBER)])
            ),
            'email': new FormControl(
                {
                    value: null,
                    disabled: false
                },
                Validators.compose([Validators.required, Validators.pattern(ValidationConstants.EMAIL)])
            )
        });

        console.log(this.myForm, '++++');

        this.myForm.controls["name"].valueChanges.subscribe((value: string) => {
            console.log("name value changed to: ", value);
        });

        this.myForm.controls["name"].valueChanges.subscribe((form: string) => {
            console.log("form changed to: ", form);
        });

        // setTimeout(() => {
        //     //reset form
        //     this.myForm.reset({
        //         name: "Max"
        //     });
        // }, 3000)
    }

    ngOnInit() {
    }

    onSubmit(value: string):void {
        console.log("submitted info: ", value);
    }

}