import { Component,Input,Output,EventEmitter } from '@angular/core';
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
  timer!:number;
@Input() errorMessages!:string;
otpForm!:FormGroup;
email:string='';
@Output() otpVerificationSubmit:EventEmitter<any>=new EventEmitter<any>();
@Output() resendEvent:EventEmitter<any>=new EventEmitter<any>();

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
  this.otpForm = this.fb.group({
    otp:[''],
    email:[this.email]
  })


}

onSubmit(){
  const formData = this.otpForm.value;
 this.otpVerificationSubmit.emit(formData);

}

startResendTimer(){
  this.timer = 90;
  const interval = setInterval(()=>{
    if(this.timer>0){
      this.timer--;
    }else{
      clearInterval(interval)
    }
  },1000)
}

resendOTP(){
  console.log(this.email);
  this.resendEvent.emit(this.email);
  this.startResendTimer();
}

}
