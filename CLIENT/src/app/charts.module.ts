import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsandchartsComponent } from './Report&Charts/reportsandcharts.component';
import { AdminDashComponent } from './components/admin/admin-dash/admin-dash.component';
import { DoctorHomeComponent } from './components/doctor/doctor-home/doctor-home.component';
import { AngularMaterialModule } from './angular-material.module';



@NgModule({
  declarations: [
    AdminDashComponent,
    DoctorHomeComponent,
    ReportsandchartsComponent
    
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports:[
    AdminDashComponent,
    DoctorHomeComponent,
    ReportsandchartsComponent,
   

  ]
})
export class ChartsModule { }
