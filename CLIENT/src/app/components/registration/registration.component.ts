import { Component,EventEmitter,Input,Output } from '@angular/core';
import { UserService } from 'src/app/shared/user.service'; 
import { User } from 'src/app/shared/user.model';
import { FormGroup,FormBuilder,Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  @Input() showerrorMessages!:string;
  @Input() showSuccessMessage!:boolean;
  @Input() isDoctor!:boolean;
  @Output() registrationSubmit:EventEmitter<any> = new EventEmitter<any>();


  phoneRegex = /^[0-9]{10}$/; 
  signUpForm!:FormGroup;

constructor(private userService: UserService, private fb:FormBuilder,private _snackBar: MatSnackBar){}
get user(): User {
  return this.userService.selectedUser;
}
ngOnInit(){
this.signUpForm = this.fb.group({
  fullName: ['',Validators.required],
  mobile_num: ['',[Validators.required,Validators.pattern(this.phoneRegex)]],
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.minLength(6)]],
  confirmPassword:['',Validators.required]
},{
  validator:this.passwordMatchValidator as ValidatorFn
});
}

passwordMatchValidator(control:AbstractControl){
const password = control.get('password');
const confirmPassword = control.get('confirmPassword');
if(password?.value!==confirmPassword?.value){
  confirmPassword?.setErrors({PasswordMismatch:true});
}else{
  confirmPassword?.setErrors(null);
}}


onSubmit(){
 
  const formData = {...this.signUpForm.value};
  delete formData.confirmPassword;
  console.log(formData);
    this.registrationSubmit.emit(formData);

}
startCounDown(){
  console.log("countdown started");
  setTimeout(()=>{this.showerrorMessages=''},4000)
}
ngOnChanges() {
  this.startCounDown();
}
}
