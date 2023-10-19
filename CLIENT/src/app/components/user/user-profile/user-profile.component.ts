import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { UserProfile } from 'src/app/shared/userProfile.model';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


interface ApiResponse{
  userData: UserProfile
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  data!:UserProfile
  constructor(private userService:UserService,
    private _dialog:MatDialog
    ){} 

  ngOnInit(){
     this.data = {
        profilePic: '',
        email: '',
        fullName: '',
        mobile_num: ""
      }
      this.getUserInfo();

  }

  getUserInfo(){
    const userId = this.userService.getUserId();
    this.userService.getUserProfileData(userId).subscribe({
      next:(res)=>{
        this.data = ((res as ApiResponse).userData)
        
      },
      error:(err)=>{
        console.error('API request error:', err);

      }
    })
      
  }

  openEditDialog(){
    const dialogRef= this._dialog.open(ProfileEditComponent,{
      data:{userData:this.data}
    });
    
    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        if(res){
          
          this.getUserInfo();
        }
      },
      
    })

  }
}
