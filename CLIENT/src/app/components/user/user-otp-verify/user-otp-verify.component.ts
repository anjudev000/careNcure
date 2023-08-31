import { Component } from '@angular/core';
import { Otp } from 'src/app/shared/otp.model';
import { OtpService } from 'src/app/shared/otp.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-otp-verify',
  templateUrl: './user-otp-verify.component.html',
  styleUrls: ['./user-otp-verify.component.css']
})
export class UserOtpVerifyComponent {
  errorMessages!:string;
constructor(private otpService:OtpService,
  private _snackBar: MatSnackBar,
  private router:Router
){}
  handleOtpSubmit(formData:Otp){
    this.otpService.verifyOTP(formData).subscribe(
      res=>{
        this._snackBar.open('OTP Verification Successfull','Close',{duration:3000});
        this.router.navigate(['/user-login']);
      },
      err=>{
        if(err.status === 400){
          this.errorMessages = 'Invalid OTP';
        }
        else if(err.status === 404){
          this.errorMessages = 'User Not Found';
        }
        else{
          this.errorMessages = 'An error occured! Please try again later!'
        }
        this._snackBar.open(this.errorMessages,'Close',{duration:3000});
      }
    )
  }
}
