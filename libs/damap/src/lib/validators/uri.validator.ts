import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

/**
 * Validates whether a given string is a valid URI based on RFC 3986.
 * @param uri The string to validate.
 * @returns True if the string is a valid URI, false otherwise.
 */
function isValidURI(uri: string): boolean {
  // Regular expression to match a general URI pattern based on RFC 3986.
  const uriRegex = /^[a-zA-Z][a-zA-Z0-9+.-]*:[^\s]*$/;
  return uriRegex.test(uri);
}

/**
 * A custom validator for validating URIs.
 * @returns Validator function for Angular forms.
 */
export function uriValidator(): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const uri = control.value;
    const isValid = !uri || isValidURI(uri);
    return of(isValid ? null : { uri: true });
  };
}
