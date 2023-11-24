import { Injectable } from '@angular/core';
import { loginModel } from './login.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  noAuthHeader = {headers: new HttpHeaders({'NoAuth':'True'})};

  constructor(private http:HttpClient) { }

  postLogin(authcredentials:loginModel){
    return this.http.post(environment.adminApiBaseUrl+'/authenticate-admin',authcredentials,this.noAuthHeader);
  }
  getAdminProfile(){
    return this.http.get(environment.adminApiBaseUrl+'/getAdminProfile');
  }
  getAllUsers(){
    return this.http.get(environment.adminApiBaseUrl+'/getUserList');
  }
  getAllDoctors(){
    return this.http.get(environment.adminApiBaseUrl+'/getDoctorList');
  }
  getPendingDocList(){
    return this.http.get(environment.adminApiBaseUrl+'/getPendingDoctors')
  }
  postUserBlockUnblock(userId:string){
    return this.http.post(environment.adminApiBaseUrl+`/User-block-Unblock/${userId}`,{});
  }
  postDoctorBlockUnblock(doctorId:string){
    return this.http.post(environment.adminApiBaseUrl+`/Doctor-block-Unblock/${doctorId}`,{});
  }
  postDocApproval(doctorId:string){
    return this.http.put(environment.adminApiBaseUrl+`/doctor-approval/${doctorId}`,{});
  }
  postDocRejection(doctorId:string,reason:string){
    return this.http.post(environment.adminApiBaseUrl+`/doctor-rejection/${doctorId}`,reason);
  }
  getDashboardData(){
    return this.http.get(environment.adminApiBaseUrl+'/admin-dashboard');
  }


  //helper methods
  setToken(token:string){
    localStorage.setItem('adminToken',token);
  }
  getToken(){
    return localStorage.getItem('adminToken');
  }
  getAdminPayload(){
    let token = this.getToken();
    if(token){
      let adminPayload = atob(token.split('.')[1]);
      return JSON.parse(adminPayload);
    }else return null;
  }
  getAdminId(){
    let adminPayload = this.getAdminPayload();
    let adminId = adminPayload._id;
    return adminId;
  }
  isLoggedIn(){
    let adminPayload = this.getAdminPayload();
    if(adminPayload){
      return adminPayload.exp > Date.now()/1000;
    }else return false;
  }
  deleteToken(){
    localStorage.removeItem('adminToken');
  }
}
