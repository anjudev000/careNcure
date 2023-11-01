import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {
  doctorId:string='';
  doctorName:string='';
  doctorDept:string='';
  selectedSlot:string='';
  selectedDate:string='';
  pic:string='';
  education:string[]=[];
  fees!:Number

constructor(private route:ActivatedRoute,
  private userService:UserService){
  route.queryParams.subscribe((queryParams=>{
    this.doctorId = queryParams['doctorId'];
    this.doctorName = queryParams['doctorName'];
    this.doctorDept = queryParams['dept'];
    this.education = queryParams['degree'];
    this.pic = queryParams['image'];
    this.selectedSlot = queryParams['selectedSlot'];
    this.selectedDate =queryParams['selectedDate'];
    this.fees = queryParams['fee'];
    console.log(this.fees,'fee 29');
  }))
}

getUserInf0(){
    const userId = this.userService.getUserId();
    const userData = this.userService.getUserProfileData(userId).subscribe({
      next:(res)=>{
        
      }
    })

}
}
