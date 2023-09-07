import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { DoctorRegistrationComponent } from './components/doctor/doctor-registration/doctor-registration.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { LoginComponent } from './components/login/login.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { DoctorLoginComponent } from './components/doctor/doctor-login/doctor-login.component';
import { UserOtpVerifyComponent } from './components/user/user-otp-verify/user-otp-verify.component';
import { DoctorOtpVerifyComponent } from './components/doctor/doctor-otp-verify/doctor-otp-verify.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { userAuthServiceGuard } from './auth/user-auth-service.guard';
import { UserForgetPassComponent } from './components/user/user-forget-pass/user-forget-pass.component';
import { DoctorForgetPasswordComponent } from './components/doctor/doctor-forget-password/doctor-forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserResetPasswordComponent } from './components/user/user-reset-password/user-reset-password.component';

const routes: Routes = [
  {
    path:'home',component:HomeComponent
  },
  {
    path:'user-signup',component:UserRegistrationComponent
  },
  {
    path:'doctor-signup',component:DoctorRegistrationComponent
  },
  {
    path:'user-otp-verify',component:UserOtpVerifyComponent
  },
  {
    path:'doctor-otp-verify',component:DoctorOtpVerifyComponent
  },

  {
    path:'user-login',component:UserLoginComponent
  },
  {
    path:'doctor-login',component:DoctorLoginComponent
  },
  {
    path:'user-home',component:UserHomeComponent , canActivate:[userAuthServiceGuard]
  },
  {
    path:'user-forget-password',component: UserForgetPassComponent
  },
  {
    path:'doctor-forget-password',component: DoctorForgetPasswordComponent
  },
  {
    path:'user-reset-password',component:UserResetPasswordComponent
  },

  {
    path:'',redirectTo:'home',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
