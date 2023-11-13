import { HttpInterceptor,HttpRequest,HttpHandler, HttpEvent } from "@angular/common/http";
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import { Router } from "@angular/router";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  private isNavigating = false;
  constructor(private router:Router){}

  intercept(req:HttpRequest<any>,next:HttpHandler) : Observable<HttpEvent<any>>{

    if(req.headers.get('noauth'))
      return next.handle(req.clone());
    
    else{
      let authToken;

      if(req.url.includes('/admin/')){
        authToken = localStorage.getItem('adminToken');}
      else if(req.url.includes('/user/')){
        authToken = localStorage.getItem('userToken');
      }else if(req.url.includes('/doctor/')){
        authToken = localStorage.getItem('doctorToken');
      }
     const clonedreq = req.clone({
      headers : req.headers.set("Authorization","Bearer "+ authToken)
     });
     return next.handle(clonedreq).pipe(
      tap(
        (event)=>{},
        (err)=>{
          if (err.status === 403 && !this.isNavigating) {
            this.isNavigating = true;
            // Redirect to the blocked page
            this.router.navigateByUrl('/blocked');
            setTimeout(() => {
              this.isNavigating = false; // Reset the flag after navigation is complete
            }, 1000);
          }
          else if(err.error.auth === false && !this.isNavigating){
            this.isNavigating = true;
            if(req.url.includes('/admin/')){
              this.router.navigateByUrl('/admin-login');
            }else if(req.url.includes('/user/')){
              this.router.navigateByUrl('/user-login');
            }else if(req.url.includes('/doctor/')){
              this.router.navigateByUrl('/doctor-login');
            }
            setTimeout(() => {
              this.isNavigating = false; // Reset the flag after navigation is complete
            }, 1000);
          }
        }
      )
     )
    }
  }
}