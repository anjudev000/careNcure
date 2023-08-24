import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { DoctorRegistrationComponent } from './components/doctor/doctor-registration/doctor-registration.component';

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
    path:'',redirectTo:'home',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
