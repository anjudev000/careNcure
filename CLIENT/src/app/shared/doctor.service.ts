import { Injectable } from '@angular/core';
import { User } from './user.model';
import { loginModel } from './login.model';
import { doctorPasswordresetModel } from './passwordReset.model';
import { forgotModel } from './passwordReset.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Prescription } from './prescription.model';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  noAuthHeader = {headers: new HttpHeaders({'NoAuth':'True'})};


  constructor(private http:HttpClient) { }

  //http methods

  postRegister(user:User){
    return this.http.post(environment.doctorapiBaseUrl+'/doctor-register',user,this.noAuthHeader);
  }
  postLogin(authcredentials:loginModel){
    return this.http.post(environment.doctorapiBaseUrl+'/authenticate-doctor',authcredentials,this.noAuthHeader)
  }
  getDoctorProfile(){
    return this.http.get(environment.doctorapiBaseUrl+'/doctor-home');
  }
  getUserName(doctorId:string){
    return this.http.get(environment.doctorapiBaseUrl+`/doctor-info/${doctorId}`);
  }
  postEmailForgotPassword(email:forgotModel){
    return this.http.post(environment.doctorapiBaseUrl+'/doctor-forgot-password',email,this.noAuthHeader);
  }
  getUserIdfromPasswordToken(token:string){
    return this.http.get(environment.doctorapiBaseUrl+`/getDoctorId/${token}`,this.noAuthHeader);
  }
  postNewPassword(passRes:doctorPasswordresetModel){
    return this.http.post(environment.doctorapiBaseUrl+'/doctor-updateNewPassword',passRes,this.noAuthHeader);
  }
  getDoctorDetails(doctorId:string){
    return this.http.get(environment.doctorapiBaseUrl+`/doctor-Profile-Details/${doctorId}`);
  }
 
  updateDoctorProfile(doctorId:string,updatedData:any){
    return this.http.put(environment.doctorapiBaseUrl+`/update-doc-profile/${doctorId}`,updatedData);
  }
  addTimeSlots(doctorId:string,timeslotData:any){
    return this.http.post(environment.doctorapiBaseUrl+`/add-time-slots/${doctorId}`,timeslotData);
  }
  getAvailSlots(doctorId:string,date:string){
    return this.http.get(environment.doctorapiBaseUrl+`/available-slots/${doctorId}/${date}`);
  }
  getBookedSlots(doctorId:string,date:string){
    return this.http.get(environment.doctorapiBaseUrl+`/booked-slots/${doctorId}/${date}`);
  }
  
  getDocSTatus(doctorId:string){
    return this.http.get(environment.doctorapiBaseUrl+`/getStatus/${doctorId}`);
  }
  getAppointments(doctorId:string){
   return this.http.get(environment.doctorapiBaseUrl+`/doctor-appointemnts/${doctorId}`);
  }
  cancelAppointments(id:string){
   return this.http.patch(environment.doctorapiBaseUrl+`/cancel-booking/${id}`,{});
  }
  confirmAppointment(id:string){
    return this.http.patch(environment.doctorapiBaseUrl+`/confirm-booking/${id}`,{});
  }
  endAppointment(id:string){
    return this.http.put(environment.doctorapiBaseUrl+`/appointment-completed/${id}`,{});
  }
  generatePrescription(id:string,prescriptionData:Prescription){
    return this.http.put(environment.doctorapiBaseUrl+`/generate-prescription/${id}`,prescriptionData);
  }
  getDashData(doctorId:string){
    return this.http.get(environment.doctorapiBaseUrl+`/dashboard-data/${doctorId}`);
  }


  //helper methods
  setToken(token:string){
    localStorage.setItem('doctorToken',token);
  }
  getToken(){
    return localStorage.getItem('doctorToken');
  }
  getDoctorPayload(){
    let token =this.getToken();
    if(token){
      let doctorPayload = atob(token.split('.')[1]);
      return JSON.parse(doctorPayload);
    }else return null;
  }
  getDoctorId(){
    let doctorPayload = this.getDoctorPayload();
    let doctorId = doctorPayload._id;
    return doctorId;
  }

  isLoggedIn(){
    let doctorPayload = this.getDoctorPayload();
    if(doctorPayload){
      return doctorPayload.exp >Date.now()/1000;
    }else return false;
  }

  deleteToken(){
    localStorage.removeItem('doctorToken');
  }
}
