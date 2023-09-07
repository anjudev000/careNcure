import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { forgotModel } from 'src/app/shared/passwordReset.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-forget-pass',
  templateUrl: './user-forget-pass.component.html',
  styleUrls: ['./user-forget-pass.component.css']
})
export class UserForgetPassComponent {

  errorMessages!:string;
  constructor(private userService:UserService,
    private _snackBar: MatSnackBar,
    ){}

  handleForgotSubmit(formData:forgotModel){
    this.userService.postEmailForgotPassword(formData).subscribe(
      res=>{
        this._snackBar.open('A Link has been sent to your mail to reset the password','Close',{duration:3000});
      },
      err=>{
        if(err.status === 400){
          this.errorMessages = 'Invalid Email';
        }
        else{
          this.errorMessages = 'Something went wrong';
        }
        this._snackBar.open(this.errorMessages,'close',{duration:3000});
      }
    )
  }
}
