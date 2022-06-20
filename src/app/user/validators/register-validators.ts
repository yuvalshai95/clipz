import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

// Validator service as a validator factory
export class RegisterValidators {
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      // Error msg
      if (!control || !matchingControl) {
        console.error('Form controls can not be found in the form group.');
        return { controlNotFound: false };
      }

      const error =
        control.value === matchingControl.value ? null : { noMatch: true };

      // Adding error to our confirm field
      matchingControl.setErrors(error);

      return error;
    };
  }
}
