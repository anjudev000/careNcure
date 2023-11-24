import { Component,ViewChild,ElementRef } from '@angular/core';
import { DoctorService } from 'src/app/shared/doctor.service';



@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent {
  dashboardData: any = {};
  totalAppointments:number=0;
  weeklyAppointments:any;
  annualRev:number=0;
  weeklyRev:number=0;
  monthlyRev:number=0;
  labels:string='';

  constructor(private doctorService:DoctorService){}
  ngOnInit(){
    const doctorId = this.doctorService.getDoctorId();
    this.doctorService.getDashData(doctorId).subscribe({
      next:(res)=>{
        console.log(16,res);
        this.dashboardData = res;
        this.totalAppointments = this.dashboardData.annualTotalAppointments;
        this.annualRev = this.dashboardData.annualRevenue;
        this.weeklyRev = this.dashboardData.weeklyRevenue;
        this.monthlyRev = this.dashboardData.monthlyRevenue;
        this.weeklyAppointments = this.dashboardData.weeklyAppointments;
        this.labels = this.weeklyAppointments.map((booking:any)=>`${booking.week}`)


      },
      error:(err)=>{
        console.log(20,err.message);
       }
    })
  }
}
