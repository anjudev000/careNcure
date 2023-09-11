import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//components
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { DoctorRegistrationComponent } from './components/doctor/doctor-registration/doctor-registration.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { DoctorLoginComponent } from './components/doctor/doctor-login/doctor-login.component';
import { UserOtpVerifyComponent } from './components/user/user-otp-verify/user-otp-verify.component';
import { DoctorOtpVerifyComponent } from './components/doctor/doctor-otp-verify/doctor-otp-verify.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { UserForgetPassComponent } from './components/user/user-forget-pass/user-forget-pass.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DoctorForgetPasswordComponent } from './components/doctor/doctor-forget-password/doctor-forget-password.component';
import { DoctorResetPasswordComponent } from './components/doctor/doctor-reset-password/doctor-reset-password.component';
import { UserResetPasswordComponent } from './components/user/user-reset-password/user-reset-password.component';
import { DoctorHomeComponent } from './components/doctor/doctor-home/doctor-home.component';


//angualar material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';

//environment
import { environment } from 'src/environment/environment';
//service
import { UserService } from './shared/user.service';
import { DoctorService } from './shared/doctor.service';


//auth service
import { userAuthServiceGuard } from './auth/user-auth-service.guard';
import { doctorAuthGuard } from './auth/doctor-auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    UserRegistrationComponent,
    DoctorRegistrationComponent,
    OtpVerificationComponent,
    UserLoginComponent,
    DoctorLoginComponent,
    UserOtpVerifyComponent,
    DoctorOtpVerifyComponent,
    UserHomeComponent,
    ForgetPasswordComponent,
    UserForgetPassComponent,
    ResetPasswordComponent,
    DoctorForgetPasswordComponent,
    DoctorResetPasswordComponent,
    UserResetPasswordComponent,
    DoctorHomeComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  UserService,userAuthServiceGuard,DoctorService,doctorAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
