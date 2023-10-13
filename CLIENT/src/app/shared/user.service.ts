import { Injectable } from '@angular/core';
import {User} from './user.model';
import { loginModel } from './login.model';
import { passwordReset } from './passwordReset.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { forgotModel } from './passwordReset.model';
import { UserProfile } from './userProfile.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser:User={
    fullName:'',
    mobile_num:'',
    email:'',
    password:''
  };

  noAuthHeader = {headers: new HttpHeaders({'NoAuth':'True'})};


  constructor(private http: HttpClient) { }
//http methods
  postUser(user:User){
   return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  postLogin(authcredentials:loginModel){
    return this.http.post(environment.apiBaseUrl+'/authenticate-user-login',authcredentials,this.noAuthHeader);
  }
  
  getUserProfile(){
    return this.http.get(environment.apiBaseUrl+'/user-home');
  }

  getUserName(userId:string){
    return this.http.get(environment.apiBaseUrl+`/user-info/${userId}`);
  }

  postEmailForgotPassword(email:forgotModel){
    return this.http.post(environment.apiBaseUrl+'/forgot-password',email,this.noAuthHeader);
  }
  getUserIdfromPasswordToken(token:string){
    return this.http.get(environment.apiBaseUrl+`/getUserId/${token}`,this.noAuthHeader)
  }
  postNewPassword(passRes: passwordReset){
    return this.http.post(environment.apiBaseUrl+'/updateNewPassword',passRes,this.noAuthHeader)
  }
  getUserProfileData(userId:string){
    return this.http.get(environment.apiBaseUrl+`/userDetails/${userId}`);
  }
  updateUserProfile(userId:string,updatedData:any){
    return this.http.put(environment.apiBaseUrl+`/updateUserProfile/${userId}`,updatedData);
  }

  //helper methods

  setToken(token:string){
    localStorage.setItem('userToken',token);
  }
  getToken(){
    console.log('testing 18',localStorage.getItem('userToken'));
    return localStorage.getItem('userToken');
  }
  deleteToken(){
    localStorage.removeItem('userToken');
  }

  getUserPayload(){
    let token = this.getToken();
    console.log("inside getUserPayload. token is:",token);
    if(token){
      let userPayload = atob(token.split('.')[1]);
      console.log('userPayload is',userPayload);
      return JSON.parse(userPayload);
    }
    else return null
  }
  getUserId(){
    let userPayload = this.getUserPayload();
    let userId = userPayload._id;
    console.log('userid line 744',userId);
    return userId;
  }

  isLoggedIn(){
    let userPayload = this.getUserPayload();
    if(userPayload){
      return userPayload.exp > Date.now() / 1000;
    }
    else{
      return false;
    }
  }
}
