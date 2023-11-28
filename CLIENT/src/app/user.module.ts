import { NgModule } from "@angular/core";
import { UserProfileComponent } from "./components/user/user-profile/user-profile.component";
import { ProfileEditComponent } from "./components/user/profile-edit/profile-edit.component";
import { SearchSpecialityComponent } from "./components/user/search-speciality/search-speciality.component";
import { BookingComponent } from "./components/user/find-doctors/booking/booking.component";
import { BookingDetailsComponent } from "./components/user/find-doctors/booking/booking-details/booking-details.component";
import { SuccessPageComponent } from "./components/user/find-doctors/booking/booking-details/success-page/success-page.component";
import { PaymentFailedComponent } from "./components/user/find-doctors/booking/booking-details/payment-failed/payment-failed.component";
import { UserWalletComponent } from "./components/user/user-wallet/user-wallet.component";
import { FindDoctorsComponent } from "./components/user/find-doctors/find-doctors.component";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "./angular-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppointmentModule } from "./appointment.module";

@NgModule({
    declarations:[
        UserProfileComponent,
        ProfileEditComponent,
        SearchSpecialityComponent,
        FindDoctorsComponent,
        BookingComponent,
        BookingDetailsComponent,
        SuccessPageComponent,
        PaymentFailedComponent,
        UserWalletComponent
        
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        AppointmentModule,
    ],
    exports:[
        UserProfileComponent,
        ProfileEditComponent,
        SearchSpecialityComponent,
        FindDoctorsComponent,
        BookingComponent,
        BookingDetailsComponent,
        SuccessPageComponent,
        PaymentFailedComponent,
        UserWalletComponent
    ]
})

export class UserModule{}