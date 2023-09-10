import { Injectable } from '@angular/core';
import { User } from './user.model';
import { loginModel } from './login.model';
import { passwordReset } from './passwordReset.model';
import { forgotModel } from './passwordReset.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  //http methods

  postRegister(user:User){
    return this.http.post(environment.apiBaseUrl+'/doctor-register',user);
  }
  postLogin(authcredentials:loginModel){
    return this.http.post(environment.apiBaseUrl+'/authenticate-doctor',authcredentials)
  }
  getDoctorProfile(){
    return this.http.get(environment.apiBaseUrl+'/doctor-home');
  }
  getUserName(doctorId:string){
    return this.http.get(environment.apiBaseUrl+`/doctor-info/${doctorId}`);
  }
  postEmailForgotPassword(email:forgotModel){
    return this.http.post(environment.apiBaseUrl+'/doctor-forgot-password',email);
  }
  getUserIdfromPasswordToken(token:string){
    return this.http.get(environment.apiBaseUrl+`/getDoctorId/${token}`);
  }
  postNewPassword(passRes:passwordReset){
    return this.http.post(environment.apiBaseUrl+'/doctor-updateNewPassword',passRes);
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
}
