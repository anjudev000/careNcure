import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {SocketIoModule,SocketIoConfig} from'ngx-socket-io';
// // Socket.io configuration
// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

//components
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HomeComponent } from './components/home/home.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { BlockedPageComponent } from './blocked-page/blocked-page.component';

//service
import { UserService } from './shared/user.service';
import { DoctorService } from './shared/doctor.service';
import { AdminService } from './shared/admin.service';

//auth service
import { userAuthServiceGuard } from './auth/user-auth-service.guard';
import { doctorAuthGuard } from './auth/doctor-auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { adminGuard } from './auth/admin.guard';

//modules
import { AuthenticationModule } from './authentication.module';
import { AngularMaterialModule } from './angular-material.module';
import { DoctorModule } from './doctor.module';
import { ChartsModule } from './charts.module';
import { UserModule } from './user.module';
import { AppointmentModule } from './appointment.module';
import { AdminModule } from './admin/admin.module';



@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    BlockedPageComponent,
    UserHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AuthenticationModule,
    AngularMaterialModule,
    DoctorModule,
    ChartsModule,
    UserModule,
    AppointmentModule,
    AdminModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    UserService, userAuthServiceGuard, DoctorService, doctorAuthGuard, AdminService, adminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
