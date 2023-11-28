import { NgModule } from "@angular/core";
import { RegistrationComponent } from "./components/registration/registration.component";
import { LoginComponent } from "./components/login/login.component";
import { UserRegistrationComponent } from "./components/user/user-registration/user-registration.component";
import { DoctorRegistrationComponent } from "./components/doctor/doctor-registration/doctor-registration.component";
import { OtpVerificationComponent } from "./components/otp-verification/otp-verification.component";
import { UserLoginComponent } from "./components/user/user-login/user-login.component";
import { DoctorLoginComponent } from "./components/doctor/doctor-login/doctor-login.component";
import { UserOtpVerifyComponent } from "./components/user/user-otp-verify/user-otp-verify.component";
import { DoctorOtpVerifyComponent } from "./components/doctor/doctor-otp-verify/doctor-otp-verify.component";
import { ForgetPasswordComponent } from "./components/forget-password/forget-password.component";
import { UserForgetPassComponent } from "./components/user/user-forget-pass/user-forget-pass.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { DoctorForgetPasswordComponent } from "./components/doctor/doctor-forget-password/doctor-forget-password.component";
import { DoctorResetPasswordComponent } from "./components/doctor/doctor-reset-password/doctor-reset-password.component";
import { UserResetPasswordComponent } from "./components/user/user-reset-password/user-reset-password.component";
import { AdminLoginComponent } from "./components/admin/admin-login/admin-login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { AngularMaterialModule } from "./angular-material.module";

@NgModule({
    declarations:[
      RegistrationComponent,
      LoginComponent,
      UserRegistrationComponent,
      DoctorRegistrationComponent,
      OtpVerificationComponent,
      UserLoginComponent,
      DoctorLoginComponent,
      UserOtpVerifyComponent,
      DoctorOtpVerifyComponent,
      ForgetPasswordComponent,
      ResetPasswordComponent,
      UserForgetPassComponent,
      UserResetPasswordComponent,
      DoctorForgetPasswordComponent,
      DoctorResetPasswordComponent,
      AdminLoginComponent
    ],
    imports:[
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        AppRoutingModule,
        CommonModule
    ],
    exports:[
        RegistrationComponent,
        LoginComponent,
        UserRegistrationComponent,
        DoctorRegistrationComponent,
        OtpVerificationComponent,
        UserLoginComponent,
        DoctorLoginComponent,
        UserOtpVerifyComponent,
        DoctorOtpVerifyComponent,
        ForgetPasswordComponent,
        ResetPasswordComponent,
        UserForgetPassComponent,
        UserResetPasswordComponent,
        DoctorForgetPasswordComponent,
        DoctorResetPasswordComponent,
        AdminLoginComponent 
    ]
   
})

export class AuthenticationModule{

}