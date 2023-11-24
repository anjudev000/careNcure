import { Component} from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';


@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent {

  dashboardData: any = {};
  totalAppointments:number=0;
  monthlyAppointments!:number[];
  monthlyRev:number=0;
  labels!:string[];
  totalRevenue:number=0;
  totalAdminRevenue:number=0;
  monthlyAppointmentsRevenue!:number[];

  constructor(private adminService:AdminService){}
 
  ngOnInit(){
    console.log("hiiiii");
    
    this.adminService.getDashboardData().subscribe({
      next:(res)=>{
        this.dashboardData = res;
        console.log(this.dashboardData,26);
        this.totalAppointments = this.dashboardData.totalAppointmentsCount;
        this.monthlyRev = this.dashboardData.monthlyRevenue;
        this.totalRevenue = this.dashboardData.totalRevenue;
        this.totalAdminRevenue = this.dashboardData.totalAdminRevenue;
        this.labels = this.dashboardData.monthlyAppointments.map((app:any)=>{
          return app.month
          })
        this.monthlyAppointmentsRevenue = this.dashboardData.monthlyAppointments.map((app:any)=>{
            return app.totalAmount;
          })
          console.log(this.monthlyAppointmentsRevenue,39);
        this.monthlyAppointments = this.dashboardData.monthlyAppointments.map((app:any)=>{
            return app.noOfAppointments;
          })
      }
    })
  }
}
