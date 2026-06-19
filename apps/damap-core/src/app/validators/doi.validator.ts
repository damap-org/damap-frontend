import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Verify DOI structure
 */
export function doiValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Do not throw error if empty (should be handled with Validator.required if needed)
    if (!control.value || control.value.length === 0) {
      return null;
    }
    const regex = /^(doi:|https:\/\/doi\.org\/)?(10\.\S*)$/;
    const doi = regex.test(control.value.trim());
    return doi ? null : { doi: true };
  };
}
