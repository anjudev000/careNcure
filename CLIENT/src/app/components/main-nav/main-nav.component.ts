import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/shared/user.service';
import { DoctorService } from 'src/app/shared/doctor.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { UserWalletComponent } from '../user/user-wallet/user-wallet.component';
import { DoctorWalletComponent } from '../doctor/doctor-wallet/doctor-wallet.component';

interface NameRes{
  Name:string;
}
interface docStatusRes{
  docstatus:string
}

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  constructor(private userService:UserService,
    private route:Router,
    private doctorService:DoctorService,
    private adminService:AdminService,
    private _dialog:MatDialog
    ){}
  userName!:string;
  doctorName!:string;
  adminName!:string;
  isDoctorLoggedIn!:boolean;
  isUserLoggedin!:boolean;
  isAdminLoggedin!:boolean;
  isApproved!:boolean;
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    ngOnInit(){
      this.route.events.subscribe(
        (val:any)=>{
        
          if(localStorage.getItem('userToken')){
            this.isUserLoggedin = true;
          
            const userId = this.userService.getUserId();
            if(userId){
        
              this.userService.getUserName(userId).subscribe(
                (res)=>{
                  this.userName = ((res as NameRes).Name)
                
                },
                (err)=>{
                  console.log(err.error.message);
                
                }
              )
            }
            
          }else if(localStorage.getItem('doctorToken')){
            this.isDoctorLoggedIn = true;
            const doctorId = this.doctorService.getDoctorId();
            if(doctorId){
              this.doctorService.getUserName(doctorId).subscribe(
                (res)=>{
                  this.doctorName = ((res as NameRes).Name)
                },
                (err)=>{
                  console.log(err.error.message);
                }
              )
            }
          }else if(localStorage.getItem('adminToken')){
            this.isAdminLoggedin = true;
            this.adminName = 'ADMIN'
          }
          else{
            console.log("not logged in");
          }
        }
      )

      this.isDocAppproved()
    }

    logout(){
      this.userService.deleteToken();
      this.userName='';
      this.route.navigateByUrl('/user-login');
    }
    doctorlogout(){
      this.doctorService.deleteToken();
      this.doctorName='';
      this.isDoctorLoggedIn = false;
      this.route.navigateByUrl('/doctor-login');
    }
    adminlogout(){
      this.adminService.deleteToken();
      this.adminName = '';
      this.isAdminLoggedin = false;
      this.route.navigateByUrl('/admin-login');
    }

    isDocAppproved(){
      const doctorId=this.doctorService.getDoctorId();
      this.doctorService.getDocSTatus(doctorId).subscribe({
        next:(res)=>{
          const status =((res as docStatusRes).docstatus);
          console.log(status,11444);
          
          if(status ==="Approved"){
            this.isApproved = true;
            console.log(this.isApproved,118);
            
          }else{
            this.isApproved = false;
            console.log(this.isApproved,120);
            
          }
        }
      })
      
    }

    dialogOpen(){
      const userId = this.userService.getUserId();
      this._dialog.open(UserWalletComponent,{
        data:{userId:userId}
      });
    }

    doctorDialog(){
      const doctorId = this.doctorService.getDoctorId();
      this._dialog.open(DoctorWalletComponent,{
        data:{doctorId:doctorId}
      })
    }
}
 