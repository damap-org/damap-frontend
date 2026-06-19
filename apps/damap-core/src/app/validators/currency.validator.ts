import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Value must be formatted as currency */
export function currencyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regex = /^\d+[,.]?\d{0,2}$/;
    const currency = regex.test(control.value);
    return currency ? null : { currency: true };
  };
}
