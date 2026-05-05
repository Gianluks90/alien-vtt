import { ValidatorFn, AbstractControl } from "@angular/forms";

export const urlValidator: ValidatorFn = (control: AbstractControl) => {
    if (!control.value) return null;
    // Simple URL regex
    const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-\.~:\/?#\[\]@!$&'()*+,;=]*)?$/i;
    return urlPattern.test(control.value) ? null : { url: true };
};