import {FormControl} from "@angular/forms";

export function nameValidator(control: FormControl) {

    if (!control.value) return;

    let controlValue = typeof control.value === 'string' ? control.value : control.value.value;

    if (controlValue && controlValue.charAt(0) === controlValue.toLocaleLowerCase().charAt(0)) {
        return {invalidName: true};
    }

    return {invalidName: false};
}