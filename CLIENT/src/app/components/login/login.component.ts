import { Component,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() errorMessages!:string;
  @Input() isDoctor!:boolean;
  @Output() loginSubmit:EventEmitter<any> = new EventEmitter<any>();

  loginForm!:FormGroup;
constructor(private fb:FormBuilder){}
userLoginModel = {
  email: '', 
  password:''
}
ngOnInit(){
  this.loginForm = this.fb.group({
    email : ['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })
}

onSubmit(){
  const formData = this.loginForm.value;

  this.loginSubmit.emit(formData);
}

}
