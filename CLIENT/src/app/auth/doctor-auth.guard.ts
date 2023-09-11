

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DoctorService } from '../shared/doctor.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class doctorAuthGuard implements CanActivate {

  constructor(private doctorService : DoctorService,
    private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.doctorService.isLoggedIn()) {
        this.router.navigateByUrl('/doctor-login');
        this.doctorService.deleteToken();
        return false;
      }
    return true;
  }
}



