import { ValidatorFn, AbstractControl } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (group: AbstractControl) => {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  if (!confirmPassword) return null;

  return password === confirmPassword ? null : { passwordMismatch: true };
};