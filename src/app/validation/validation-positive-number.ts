import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validationPositiveNumber(c: AbstractControl): ValidationErrors {
    return c.value > 0 ? null : {
        forbiddenNumber: true
    };
}
