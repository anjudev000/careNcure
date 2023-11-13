import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorService } from 'src/app/shared/doctor.service';

interface ApiResponse{
  appointments:any
}
interface confirmResponse{
  message:string
}

interface Appointment{
  _id:string;
  appointmentId:number;
  userId:{
    fullName:string;
  };
  slotBooked:string;
  status:string;
}

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent {
    appointments:Appointment[]=[];
   constructor(private doctorService:DoctorService,
    private _snackBar:MatSnackBar
    ){}
    
    ngOnInit(){
      this.getAppointmentData();
    }
  
      getAppointmentData(){
      const doctorId = this.doctorService.getDoctorId();
      this.doctorService.getAppointments(doctorId).subscribe({
        next:(res)=>{
          console.log(466,res);
          
          const data = ((res as ApiResponse).appointments);
          console.log(42222,data);
          this.appointments = data;
        },
          error:(err:any)=>{
            alert('Error fetching the data!');
          }
      })
    }

    cancelAppointment(id:string){
      console.log(62,id);
      Swal.fire({
        title: 'Confirmation',
        text: 'Please confirm to cancel the appointment',
        icon: 'question',
        showCancelButton:true,
        confirmButtonText:'Confirm',
        cancelButtonText:'Cancel'
      }).then((result)=>{
        if(result.isConfirmed){
          this.doctorService.cancelAppointments(id).subscribe({
            next:(res:any)=>{
             this.getAppointmentData();
            this._snackBar.open('Appointmnet has been cancelled','Close',{duration:4000});
            },error:(err:any)=>{
              this._snackBar.open('Error occuring while cancelling','Close',{duration:4000});
             }
          }) 
          }
         }) 
        }

        // checkTimeToEnableVideoCall(app:Appointment){
        //   const appointmentTime = new Date(app.slotBooked).getTime();
        //   const currentTime = new Date().getTime();
        //   const timeDifference = currentTime - appointmentTime;
        //   const fifteenMinutesInMilliseconds = 15 * 60 * 1000;
        //   app.enableStartCallButton = timeDifference <= fifteenMinutesInMilliseconds;
        // }

        handleButtonClick(app:Appointment){
          if(app.status === 'Confirmed'){
            this.startVideoCall(app);
          }else if(app.status === 'Completed'){
            this.createPrescription(app);
          }else{
            this.confirmAppointment(app._id);
          }
        }

        confirmAppointment(id:string){
          this.doctorService.confirmAppointment(id).subscribe({
            next:(res)=>{
              const response = ((res as confirmResponse).message)
              this._snackBar.open(response,'Close',{duration:4000});
              this.getAppointmentData();
            },
            error:(err)=>{

            }
          })
        }
         startVideoCall(app:Appointment){

        }
       createPrescription(app:Appointment){

        }


}
