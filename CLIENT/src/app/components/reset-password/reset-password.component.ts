import { Component,Input,Output,EventEmitter } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  @Input() errorMessages!:string;
  @Output() passwordResetSubmit:EventEmitter<any> = new EventEmitter<any>();
  token!:string;
  passwordResetForm!:FormGroup;

  constructor(private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private route:ActivatedRoute 
    ){}

    ngOnInit(){
      this.passwordResetForm = this.fb.group({
        password:['',[Validators.required,Validators.minLength(6)]],
        confirmPassword:['',Validators.required]
      },{
        validator:this.passwordMatchValidator as ValidatorFn
      })

      this.route.queryParams.subscribe(
        params=>{
          this.token = params['token'];
        })
    }

    passwordMatchValidator(control:AbstractControl){
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      if(password?.value!==confirmPassword?.value){
        confirmPassword?.setErrors({PasswordMismatch:true});
      }else{
        confirmPassword?.setErrors(null);
      }
    }

    onSubmit(){
      const formData = {...this.passwordResetForm.value, token: this.token};
      delete formData.confirmPassword;
      console.log("formdata from generic component:",formData);
      this.passwordResetSubmit.emit(formData);
    }
}
