import { Component,EventEmitter,Input,Output } from '@angular/core';
import { Otp } from 'src/app/shared/otp.model';
import { FormGroup,FormBuilder, } from '@angular/forms';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { OtpService } from 'src/app/shared/otp.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent {
errorMessages!:string;
otpForm!:FormGroup;
email:string='';

constructor(private otpService:OtpService,
  private fb:FormBuilder,
  private _snackBar: MatSnackBar,
  private route:ActivatedRoute,
  private router:Router){}
get otp():Otp{
  return this.otpService.otp;
}
ngOnInit(){
   this.email = history.state.email;
  console.log("email from registration component:",this.email);
  this.otpForm = this.fb.group({
    otp:[''],
    email:[this.email]
  })
}

onSubmit(){
  const formData = this.otpForm.value;
  this.otpService.verifyOTP(formData).subscribe(
    res=>{
       this._snackBar.open('OTP Verification Successful','Close',{duration:3000}) ;
      this.router.navigate(['/login']);
    },
    err=>{
      if(err.status === 400){
        this.errorMessages = 'Invalid OTP';
      }
      else if(err.status === 404){
        this.errorMessages = 'User Not Found';
      }
      else{
        this.errorMessages = 'An error occured!Please try again later!'
      }
      // this._snackBar.open(this.errorMessages, 'Close', {
      //   duration: 3000, // Duration in milliseconds
      // });
    }
  )
}

}
