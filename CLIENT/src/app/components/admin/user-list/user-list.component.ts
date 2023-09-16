import { Component } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';
import { UserData } from 'src/app/data-table/data-table.component';
import {MatTableDataSource} from '@angular/material/table';

interface ApiResponse {
  users: UserData[]; // Assuming 'users' is the property containing an array of UserData
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  userColumns: string[] = ['fullName', 'mobile_num', 'email','Action'];
  dataSource!:MatTableDataSource<UserData>
  block:boolean=true;
  constructor(private adminService:AdminService){}

  ngOnInit(){
    this.getAllUser()
  }


getAllUser() {
  this.adminService.getAllUsers().subscribe({
    next: (res) => {
        if (res && ((res as ApiResponse).users)) {
          // Assuming your API response structure is { "users": [...] }
          console.log(res,400000);
          const usersArray = ((res as ApiResponse).users);
          this.dataSource = new MatTableDataSource<UserData>(usersArray);
        } else {
          // Handle any other unexpected response structure or error
          console.error('Unexpected API response:', res);
        }
      },error: (err) => {
      console.error('API request error:', err);
    }
  });
}

handleblock(userId:string, isblocked:boolean){
  const apimethod = isblocked?this.adminService.postUserBlockUnblock(userId):this.adminService.postUserBlockUnblock(userId);
  apimethod.subscribe({
    next:(res)=>{
      console.log("user blocked");
    },
    error:(err)=>{
      console.log("error is :",err);
    }
  })
}


}