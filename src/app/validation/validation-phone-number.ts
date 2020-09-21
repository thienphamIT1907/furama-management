import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validationPhoneNumber(c: AbstractControl): ValidationErrors {
    const regex = '^(0|\\(84\\)\\+)9(0|1)\\d{7}$';
    const data = c.value;
    return data.match(regex) ? null : {
        wrongPhoneNumberPattern: true
    };
}
