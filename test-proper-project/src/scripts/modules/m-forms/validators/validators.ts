import {FormControl} from "@angular/forms";

export function nameValidator(control: FormControl) {
    console.log(control);
    if (control.value && control.value.charAt(0) === control.value.toLocaleLowerCase().charAt(0)) {
        return {invalidName: true};
    }
}