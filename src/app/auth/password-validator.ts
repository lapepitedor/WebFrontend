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

 // [ngClass]="{'is-invalid':registerForm.controls.name.invalid && registerForm.controls.dirty,
               //    'is-valid':registerForm.controls.name.valid && registerForm.controls.dirty}"


             /*  const firebaseConfig = {
                 apiKey: 'AIzaSyDVRf0x6C0xJFlNL_EMoRO9sx9pmL5Y0fM',
                 authDomain: 'profilmanagerapp.firebaseapp.com',
                 projectId: 'profilmanagerapp',
                 storageBucket: 'profilmanagerapp.appspot.com',
                 messagingSenderId: '828991318293',
                 appId: '1:828991318293:web:0862acb562a9e745c6e11c',
               }; */