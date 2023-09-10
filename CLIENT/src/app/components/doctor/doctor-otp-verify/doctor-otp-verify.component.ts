import { Component } from '@angular/core';
import { Otp } from 'src/app/shared/otp.model';
import { OtpService } from 'src/app/shared/otp.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-doctor-otp-verify',
  templateUrl: './doctor-otp-verify.component.html',
  styleUrls: ['./doctor-otp-verify.component.css']
})
export class DoctorOtpVerifyComponent {
 errorMessages!:string;
 constructor(private otpService:OtpService,
  private router:Router,
  private _snackBar:MatSnackBar
  ){}
 
  handleOtpSubmit(formData:Otp){
    this.otpService.verifyDoctorOTP(formData).subscribe(
      res=>{
        this._snackBar.open('OTP Verification Successfull','Close',{duration:3000});
        this.router.navigate(['/doctor-login'])
      },
      err=>{
        if(err.status === 400){
          this.errorMessages = 'Invalid OTP';
        }
        else if(err.status === 404){
          this.errorMessages = 'Doctor Not Found';
        }
        else{
          this.errorMessages = 'An error occured! Please try again later!'
        }
        this._snackBar.open(this.errorMessages,'Close',{duration:3000});

      }
    )
  }
}
