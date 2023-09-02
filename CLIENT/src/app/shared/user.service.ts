import { Injectable } from '@angular/core';
import {User} from './user.model';
import { loginModel } from './login.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
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
