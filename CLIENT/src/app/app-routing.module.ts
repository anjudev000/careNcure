import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { DoctorRegistrationComponent } from './components/doctor/doctor-registration/doctor-registration.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { LoginComponent } from './components/login/login.component';

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
    path:'verify',component:OtpVerificationComponent
  },
  {
    path:'login',component:LoginComponent
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
