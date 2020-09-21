import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validationEmail(c: AbstractControl): ValidationErrors {
    const regex = '^[a-zA-Z0-9]+@[a-z]+.com$';
    const data = c.value;
    return data.match(regex) ? null : {
        wrongEmailPattern: true
    };
}
