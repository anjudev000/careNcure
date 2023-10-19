import { Component,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';



@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

@Input() errorMessages!:string;
forgotPasswordForm!:FormGroup;
@Output() emailSubmit:EventEmitter<any>=new EventEmitter<any>();

constructor(private fb:FormBuilder){}
ngOnInit(){
  this.forgotPasswordForm = this.fb.group({
    email:['',[Validators.required,Validators.email]]
  })
}

onSubmit(){
  const formData = this.forgotPasswordForm.value;
  this.emailSubmit.emit(formData);
}
}
