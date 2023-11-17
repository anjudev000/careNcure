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
import { DoctorHomeComponent } from './components/doctor/doctor-home/doctor-home.component';
import { doctorAuthGuard } from './auth/doctor-auth.guard';
import { DoctorResetPasswordComponent } from './components/doctor/doctor-reset-password/doctor-reset-password.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { adminGuard } from './auth/admin.guard';
import { AdminDashComponent } from './components/admin/admin-dash/admin-dash.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { DocListComponent } from './components/admin/doc-list/doc-list.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { DocProfileComponent } from './components/doctor/doc-profile/doc-profile.component';
import { ScheduleSlotComponent } from './components/doctor/schedule-slot/schedule-slot.component';
import { PendingDocComponent } from './components/admin/pending-doc/pending-doc.component';
import { SearchSpecialityComponent } from './components/user/search-speciality/search-speciality.component';
import { FindDoctorsComponent } from './components/user/find-doctors/find-doctors.component';
import { BookingComponent } from './components/user/find-doctors/booking/booking.component';
import { BookingDetailsComponent } from './components/user/find-doctors/booking/booking-details/booking-details.component';
import { SuccessPageComponent } from './components/user/find-doctors/booking/booking-details/success-page/success-page.component';
import { UserAppointmentComponent } from './components/user/user-appointment/user-appointment.component';
import { PaymentFailedComponent } from './components/user/find-doctors/booking/booking-details/payment-failed/payment-failed.component';
import { BlockedPageComponent } from './blocked-page/blocked-page.component';
import { DoctorAppointmentsComponent } from './components/doctor/doctor-appointments/doctor-appointments.component';
import { VideoCallComponent } from './components/video-call/video-call.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'user-signup', component: UserRegistrationComponent
  },
  {
    path: 'doctor-signup', component: DoctorRegistrationComponent
  },
  {
    path: 'user-otp-verify', component: UserOtpVerifyComponent
  },
  {
    path: 'doctor-otp-verify', component: DoctorOtpVerifyComponent
  },

  {
    path: 'user-login', component: UserLoginComponent
  },
  {
    path: 'doctor-login', component: DoctorLoginComponent
  },
  {
    path: 'user-home', component: UserHomeComponent, canActivate: [userAuthServiceGuard]
  },
  {
    path: 'doctor-home', component: DoctorHomeComponent, canActivate: [doctorAuthGuard]
  },
  {
    path: 'user-forget-password', component: UserForgetPassComponent
  },
  {
    path: 'doctor-forget-password', component: DoctorForgetPasswordComponent
  },
  {
    path: 'user-reset-password', component: UserResetPasswordComponent
  },
  {
    path: 'doctor-reset-password', component: DoctorResetPasswordComponent
  },
  {
    path: 'admin-login', component: AdminLoginComponent
  },
  {
    path: 'admin-dashboard', component: AdminDashComponent, canActivate: [adminGuard]
  },
  {
    path:'userList',component:UserListComponent,canActivate:[adminGuard]
  },
  {
    path:'docList',component:DocListComponent,canActivate:[adminGuard]
  },
  {
    path:'pending-doc-list',component:PendingDocComponent,canActivate:[adminGuard]
  },
  {
    path:'user-profile',component:UserProfileComponent,canActivate:[userAuthServiceGuard]
  },
  {
 path:'doctor-profile',component:DocProfileComponent,canActivate:[doctorAuthGuard]
  },
  {
    path:'schedule-slot',component:ScheduleSlotComponent,canActivate:[doctorAuthGuard]
  },
  {
    path:'search-speciality',component:SearchSpecialityComponent,canActivate:[userAuthServiceGuard]
  },
  {
    path:'search-doctors',component:FindDoctorsComponent,canActivate:[userAuthServiceGuard]
  },
  {
    path:'booking',component:BookingComponent,canActivate:[userAuthServiceGuard]
  },
  {
    path:'booking-details',component:BookingDetailsComponent,canActivate:[userAuthServiceGuard]
  },
  {
    path:'booking-success',component:SuccessPageComponent,canActivate:[userAuthServiceGuard]
  },
  {
    path:'payment-failed',component:PaymentFailedComponent,canActivate:[userAuthServiceGuard]
  },
  {
    path:'user-appointment',component:UserAppointmentComponent,canActivate:[userAuthServiceGuard]
  },
  {
    path:'doctor-appointemnts',component:DoctorAppointmentsComponent,canActivate:[doctorAuthGuard]
  },
  {
    path:'blocked',component:BlockedPageComponent
  },
  {
    path:'doctor/call/:room',component:VideoCallComponent,canActivate:[doctorAuthGuard]
  },
  {
    path:'user/call/:room',component:VideoCallComponent,canActivate:[userAuthServiceGuard]
  },
 {
    path: '', redirectTo: 'home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }