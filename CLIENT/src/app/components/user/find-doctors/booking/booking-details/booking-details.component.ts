import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import {loadStripe} from '@stripe/stripe-js';
import { environment } from 'src/environment/environment';

interface ApiResponse{
  userData:any
}

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
  fees!:Number;
  userId:string='';
  userName:string='';
  userEmail:string='';
  slot:any;
  doctorData:any;

constructor(private route:ActivatedRoute,
  private userService:UserService,
  ){
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

ngOnInit(){
  this.getUserInfo()
}

getUserInfo(){
  
    this.userId= this.userService.getUserId();
    this.userService.getUserProfileData(this.userId).subscribe({
      next:(res)=>{
        const user = ((res as ApiResponse).userData);
        this.userName=user.fullName;
        this.userEmail=user.email;
        console.log(user,3999);
        
      }
    })

}

onConfirmAppointment(){
  this.doctorData={
    doctorId:this.doctorId,
    fullName:this.doctorName,
    fee:this.fees
  }
  this.slot={
    date:this.selectedDate,
    time:this.selectedSlot
  }
this.userService.postPaymentData(this.doctorData,this.userId,this.slot).subscribe(
  async (res:any)=>{
    let stripe = await loadStripe(environment.stripeKEY);
    stripe?.redirectToCheckout({
      sessionId:res.id
    })
  }
)
}
}
