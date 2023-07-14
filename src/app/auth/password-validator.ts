import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class PasswordValidator {
    
}
// i have crated a function call passwordvalidator VON type 
//validationftion and it take one input parameter of type AbsTRACcontrol and he Return some Validation error or null
 export const passwordvalidator: ValidatorFn = (
   control: AbstractControl
 ): ValidationErrors | null => {
     
     let password = control.get('password');
     let repeatPassword = control.get('repeatPassword');
     if (password &&repeatPassword && password?.value != repeatPassword?.value) {
         return {
             passwordmatchingerror: true
         }
     }
   return null;
 };