import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Otp } from './otp.model';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  otp:Otp={
    otp:0,
    email:''
  };
  constructor(private http:HttpClient) { }

  verifyOTP(data:Otp){
    return this.http.post(environment.apiBaseUrl+'/verifyOTP',data);  
  }
  verifyDoctorOTP(data:Otp){
    return this.http.post(environment.doctorapiBaseUrl+'/doctor-otp-verify',data);
  }
}
