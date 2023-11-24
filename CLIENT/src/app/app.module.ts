import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
// import { SpinnersAngularModule } from 'spinners-angular';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SocketIoModule,SocketIoConfig} from'ngx-socket-io';
// Socket.io configuration
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };



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
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminDashComponent } from './components/admin/admin-dash/admin-dash.component';
import { DataTableComponent } from './data-table/data-table.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { DocListComponent } from './components/admin/doc-list/doc-list.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { ProfileEditComponent } from './components/user/profile-edit/profile-edit.component';
import { DocProfileComponent } from './components/doctor/doc-profile/doc-profile.component';
import { DocProfileEditComponent } from './components/doctor/doc-profile/doc-profile-edit/doc-profile-edit.component';



//angualar material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
// import { MatFileUploadModule } from 'angular-material-fileupload';
//environment
import { environment } from 'src/environment/environment';
//service
import { UserService } from './shared/user.service';
import { DoctorService } from './shared/doctor.service';
import { AdminService } from './shared/admin.service';


//auth service
import { userAuthServiceGuard } from './auth/user-auth-service.guard';
import { doctorAuthGuard } from './auth/doctor-auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { adminGuard } from './auth/admin.guard';
import { MessageDialogComponent } from './components/admin/pending-doc/message-dialog/message-dialog.component';
import { ScheduleSlotComponent } from './components/doctor/schedule-slot/schedule-slot.component';
import { PendingDocComponent } from './components/admin/pending-doc/pending-doc.component';
import { SearchSpecialityComponent } from './components/user/search-speciality/search-speciality.component';
import { FindDoctorsComponent } from './components/user/find-doctors/find-doctors.component';
import { BookingComponent } from './components/user/find-doctors/booking/booking.component';
import { BookingDetailsComponent } from './components/user/find-doctors/booking/booking-details/booking-details.component';
import { SuccessPageComponent } from './components/user/find-doctors/booking/booking-details/success-page/success-page.component';
import { UserAppointmentComponent } from './components/user/user-appointment/user-appointment.component';
import { PaymentFailedComponent } from './components/user/find-doctors/booking/booking-details/payment-failed/payment-failed.component';
import { UserWalletComponent } from './components/user/user-wallet/user-wallet.component';
import { BlockedPageComponent } from './blocked-page/blocked-page.component';
import { DoctorAppointmentsComponent } from './components/doctor/doctor-appointments/doctor-appointments.component';
import { VideoCallComponent } from './components/video-call/video-call.component';
import { DoctorWalletComponent } from './components/doctor/doctor-wallet/doctor-wallet.component';
import { PrescriptionComponent } from './components/doctor/prescription/prescription.component';
import { ReportsandchartsComponent } from './Report&Charts/reportsandcharts.component';

interface NgxSpinnerConfig {
  type?: string;
}

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
    AdminLoginComponent,
    AdminDashComponent,
    DataTableComponent,
    UserListComponent,
    DocListComponent,
    UserProfileComponent,
    ProfileEditComponent,
    DocProfileComponent,
    DocProfileEditComponent,
    MessageDialogComponent,
    ScheduleSlotComponent,
    PendingDocComponent,
    SearchSpecialityComponent,
    FindDoctorsComponent,
    BookingComponent,
    BookingDetailsComponent,
    SuccessPageComponent,
    UserAppointmentComponent,
    PaymentFailedComponent,
    UserWalletComponent,
    BlockedPageComponent,
    DoctorAppointmentsComponent,
    VideoCallComponent,
    DoctorWalletComponent,
    PrescriptionComponent,
    ReportsandchartsComponent,
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
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatDividerModule,
    NgxSpinnerModule,
    CommonModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    SocketIoModule.forRoot(config)
    // NgxStripeModule.forRoot(environment.stripeKEY)
    // SpinnersAngularModule
    // MatFileUploadModule
    

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
