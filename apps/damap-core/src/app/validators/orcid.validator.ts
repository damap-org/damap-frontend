import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Verify ORCID iD structure
 * see also: https://support.orcid.org/hc/en-us/articles/360006897674-Structure-of-the-ORCID-Identifier
 */
export function orcidValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Do not throw error if empty (should be handled with Validator.required if needed)
    if (!control.value || control.value.length === 0) {
      return null;
    }
    const orcid = true;
    const input = control.value.replaceAll('-', '');
    let total = 0;
    for (let i = 0; i < input.length - 1; i++) {
      let digit = +input.charAt(i);
      total = (total + digit) * 2;
    }
    let remainder = total % 11;
    let result = (12 - remainder) % 11;
    // Check if last character is correct (checksum)
    if (input.length === 16) {
      let lastChar = result === 10 ? 'X' : result;
      return lastChar == input.charAt(15) ? null : { orcid };
    }
    return { orcid };
  };
}
