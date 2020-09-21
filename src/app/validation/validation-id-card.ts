import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validationIdCard(c: AbstractControl): ValidationErrors {
    const regex = '^((\\d{9})|(\\d{12}))$';
    const data = c.value;
    return data.match(regex) ? null : {
        wrongIdCardPattern: true
    };
}
