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
  monthlyAppointmentsRevenue!:number[];
  monthlyAppointments!:number[];
  annualRev:number=0;
  weeklyRev:number=0;
  monthlyRev:number=0;
  labels!:string[];

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
        this.labels = this.dashboardData.monthlyAppointments.map((app:any)=>{
        console.log(app,32);
        return app.month
        })
        console.log(this.labels,34);
        
        this.monthlyAppointmentsRevenue = this.dashboardData.monthlyAppointments.map((app:any)=>{
          return app.totalAmount;
        })
        console.log(this.monthlyAppointmentsRevenue,39);
        this.monthlyAppointments = this.dashboardData.monthlyAppointments.map((app:any)=>{
          return app.noOfAppointments;
        })
      },
      error:(err)=>{
        console.log(20,err.message);
       }
    })
  }
}
