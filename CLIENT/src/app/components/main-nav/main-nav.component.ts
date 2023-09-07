import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

interface NameRes{
  Name:string;
}

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  constructor(private userService:UserService,private route:Router){}
  userName!:string;
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    ngOnInit(){
      this.route.events.subscribe(
        (val:any)=>{
          console.log(val.url);
          if(localStorage.getItem('userToken')){
            console.log("user is logged in");
            const userId = this.userService.getUserId();
            if(userId){
              console.log('line 844',userId);
              this.userService.getUserName(userId).subscribe(
                (res)=>{
                  this.userName = ((res as NameRes).Name)
                  console.log('line 944',this.userName);
                },
                (err)=>{
                  console.log(err.error.message);
                
                }
              )
            }
            
          }
          else{
            console.log("not logged in");
          }
        }
      )
    }

    logout(){
      this.userService.deleteToken();
      this.route.navigateByUrl('/user-login');
    }
}
