import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAppointmentComponent } from './components/user/user-appointment/user-appointment.component';
import { DoctorAppointmentsComponent } from './components/doctor/doctor-appointments/doctor-appointments.component';
import { VideoCallComponent } from './components/video-call/video-call.component';
import {SocketIoModule,SocketIoConfig} from'ngx-socket-io';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
// Socket.io configuration
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };



@NgModule({
  declarations: [
    UserAppointmentComponent,
    DoctorAppointmentsComponent,
    VideoCallComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SocketIoModule.forRoot(config)


  ],
  exports:[
    UserAppointmentComponent,
    DoctorAppointmentsComponent,
    VideoCallComponent
  ]
})
export class AppointmentModule { }
