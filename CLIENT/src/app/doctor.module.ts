import { NgModule } from "@angular/core";
import { DoctorHomeComponent } from "./components/doctor/doctor-home/doctor-home.component";
import { DocProfileEditComponent } from "./components/doctor/doc-profile/doc-profile-edit/doc-profile-edit.component";
import { DocProfileComponent } from "./components/doctor/doc-profile/doc-profile.component";
import { ScheduleSlotComponent } from "./components/doctor/schedule-slot/schedule-slot.component";
import { DoctorWalletComponent } from "./components/doctor/doctor-wallet/doctor-wallet.component";
import { PrescriptionComponent } from "./components/doctor/prescription/prescription.component";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "./angular-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "./charts.module";
import { AppointmentModule } from "./appointment.module";

@NgModule({
    declarations:[
        DocProfileComponent,
        DocProfileEditComponent,
        ScheduleSlotComponent,
        DoctorWalletComponent,
        PrescriptionComponent,

    ],
    imports:[
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AngularMaterialModule,
        ChartsModule,
        AppointmentModule
    ],
    exports:[
        DocProfileComponent,
        DocProfileEditComponent,
        ScheduleSlotComponent,
        DoctorWalletComponent,
        PrescriptionComponent,
    ]
})


export class DoctorModule{}
