import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { loginModel } from 'src/app/shared/login.model';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

interface LoginResponse{
  token:string
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  loginForm! :FormGroup;
  errorMessages!:string;
constructor(private userService: UserService, private router:Router){}


  handleLoginSubmit(formData:loginModel){
    this.errorMessages='';
    console.log("user component:",formData);
    this.userService.postLogin(formData).subscribe(
      res =>{
        console.log("login successfull. response : ",res);
        this.userService.setToken((res as LoginResponse).token)
      },
      err=>{
        this.errorMessages = err.error.message;
        console.log("errorr",this.errorMessages);
        if(err.error.notVerified)
        this.errorMessages='User Not Verified! Please Verify to continue. Otp is send to your mail';
        setTimeout(()=>{
          this.router.navigate(['/user-otp-verify'],{state:{email:formData.email}});
        },6000)
      }
    )
  }

}
