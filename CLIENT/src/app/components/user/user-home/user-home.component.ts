import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

interface UserProfileResponse{
  user:any;
}

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
userDetails:any;

constructor(private userservice:UserService,private router:Router){}

ngOnInit(){
  this.userservice.getUserProfile().subscribe(
    res=>{
      this.userDetails = (res as UserProfileResponse).user;
    },
    err=>{
      console.log(err.message);
    }
  )
}

}
