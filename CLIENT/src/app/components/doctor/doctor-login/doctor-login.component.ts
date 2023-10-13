import { Component } from '@angular/core';
import { loginModel } from 'src/app/shared/login.model';
import { DoctorService } from 'src/app/shared/doctor.service';
import { Router } from '@angular/router';

interface DoctorLoginResponse{
  doctorToken:string
}

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent {
  errorMessages!:string;
  isDoctor:boolean = true;
  constructor(private doctorService:DoctorService,
    private router:Router
    ){}

    ngOnInit(){
      if(this.doctorService.isLoggedIn()){
        this.router.navigateByUrl('/doctor-home');
      }
    }

    handleDoctorLoginSubmit(formData:loginModel){
      this.errorMessages='';
      this.doctorService.postLogin(formData).subscribe(
        res=>{
          this.doctorService.setToken((res as DoctorLoginResponse).doctorToken);
          this.router.navigateByUrl('/doctor-home');
        },
        err=>{
          this.errorMessages = err.error.message;
          if(err.error.notVerified){
          this.errorMessages = 'Doctor not verified. Please verify to Continue. OTP send to your mail';
          setTimeout(()=>{
            this.router.navigate(['/doctor-otp-verify'],{state:{email:formData.email}});
          },6000)
        }
        }
      )
    }
}
