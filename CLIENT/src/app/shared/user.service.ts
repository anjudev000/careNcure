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
  

  constructor(private http: HttpClient) { }
//http methods
  postUser(user:User){
   return this.http.post(environment.apiBaseUrl+'/register',user);
  }

  postLogin(authcredentials:loginModel){
    return this.http.post(environment.apiBaseUrl+'/authenticate-user-login',authcredentials);
  }

  //helper methods

  setToken(token:string){
    localStorage.setItem('userToken',token)
  }
}
