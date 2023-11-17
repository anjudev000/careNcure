import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from 'src/app/shared/socket.service';
import { NavigationExtras, Router } from '@angular/router';



interface ApiResponse{
  bookings:any
}
interface Booking {
  _id:string;
  userId:string;
  email:string;
  Doctor: string;
  Scheduled: string;
  BookedOn: string;
  Status: string;
  Action: string;
  isCancelled:boolean;
}


@Component({
  selector: 'app-user-appointment',
  templateUrl: './user-appointment.component.html',
  styleUrls: ['./user-appointment.component.css']
})
export class UserAppointmentComponent {

  displayedColumns: string[] = ['No','Doctor','Scheduled','BookedOn','Status','Action'];
  dataSource!:MatTableDataSource<any>;

  constructor(
    private userService:UserService,
    private socketService:SocketService,
    private router:Router,
    private _snackBar:MatSnackBar,
    
    ){}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(){
    this.getAppointmentData();
  }

  getAppointmentData(){
    const userId = this.userService.getUserId();
    this.userService.getApppointmentData(userId).subscribe({
      next:(res)=>{
        const data = ((res as ApiResponse).bookings);
        console.log(42222,data);
        // console.table(433333,data)
        const bookings: Booking[] = data.map((booking: any) => {
          return {
            _id: booking._id,
            userId:booking.userId,
            email:booking.userId.email,
            Doctor: booking.doctorId.fullName,
            Scheduled: booking.slotBooked,
            BookedOn: booking.updatedAt.split(' ')[0],
            Status: booking.status,
            isCancelled: booking.status === 'Cancelled'? true:false
          };
        });
        console.log(bookings,5222);
        this.dataSource = new MatTableDataSource(bookings);
        },
        error:(err)=>{
          alert('Error fetching the data!');
        }
    })
  }

  cancelAppointment(id:string){
    console.log(62,id);
    Swal.fire({
      title: 'Confirmation',
      text: 'Please confirm to cancel the appointment',
      icon: 'question',
      showCancelButton:true,
      confirmButtonText:'Confirm',
      cancelButtonText:'Cancel'
    }).then((result)=>{
      if(result.isConfirmed){
        this.userService.cancelAppointment(id).subscribe({
          next:(res)=>{
            const cancelledAppointment = this.dataSource.data.find(app=>app._id === id);
            if(cancelledAppointment){
              cancelledAppointment.isCancelled = true;
              this.dataSource.data = [...this.dataSource.data];
            }
            this._snackBar.open('Appointmnet has been cancelled, the fee is refunded to your wallet','Close',{duration:4000});
          },error:(err)=>{
            this._snackBar.open('Error occuring while cancelling','Close',{duration:4000});

          }
        })
        
      }
    })
    
  }

  joinCall(roomId:string,email:string,booking:any):void{
     const room = roomId;
     this.socketService.userRoomJoin({ email, room });
     const value = 'user';
     this.router.navigate([`user/call/${room}`],{state:{value:'user'}});
}
}
