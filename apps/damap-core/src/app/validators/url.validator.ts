import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import validator from 'validator';
import { Observable, of } from 'rxjs';

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const url = control.value;
    const isValid =
      !url ||
      validator.isURL(url, {
        protocols: ['http', 'https'],
        require_protocol: false,
        require_valid_protocol: true,
        allow_underscores: false,
        allow_trailing_dot: false,
        allow_protocol_relative_urls: false,
      });
    return of(isValid ? null : { url: true });
  };
}
