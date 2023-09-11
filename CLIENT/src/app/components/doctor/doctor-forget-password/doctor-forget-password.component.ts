import { Component } from '@angular/core';
import { DoctorService } from 'src/app/shared/doctor.service';
import { forgotModel } from 'src/app/shared/passwordReset.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctor-forget-password',
  templateUrl: './doctor-forget-password.component.html',
  styleUrls: ['./doctor-forget-password.component.css']
})
export class DoctorForgetPasswordComponent {
  errorMessages!: string

  constructor(private doctorService: DoctorService,
    private _snackBar: MatSnackBar
  ) { }

  handleEmailSubmit(formData: forgotModel) {
    this.doctorService.postEmailForgotPassword(formData).subscribe(
      (res) => {
        this._snackBar.open('A Link has been sent to your mail to reset the password', 'Close', { duration: 3000 });

      },
      (err) => {
        if (err.status === 400) {
          this.errorMessages = 'Invalid Email';
        }
        else {
          this.errorMessages = 'Something went wrong';
        }
        this._snackBar.open(this.errorMessages, 'close', { duration: 3000 });

      }
    )
  }
}
