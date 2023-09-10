import { Component } from '@angular/core';
import { DoctorService } from 'src/app/shared/doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css']
})
export class DoctorRegistrationComponent {
showerrorMessages!:string;
showSuccessMessage!:boolean;
constructor(private doctorService:DoctorService,
  private _snackBar:MatSnackBar,
  private router:Router
  ){}
  handleRegistrationSubmit(formData:User){
    this.showerrorMessages='';
    this.doctorService.postRegister(formData).subscribe(
      res=>{
        this.showSuccessMessage = true;
        this._snackBar.open('Doctor Registered. Verify To Activate your account','Close',{duration:3000});
        this.router.navigate(['/doctor-otp-verify'],{
          state:{email:formData.email}
        })
      },
      err=>{
        if(err.status === 422){
          this.showerrorMessages = err.error[0];
        }else{
          this.showerrorMessages = 'Something went wrong'
        }
      }
    )
  }
}
