import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from 'src/app/shared/user.service';

interface ApiResponse{
  bookings:any
}
interface Booking {
  Doctor: string;
  Scheduled: string;
  BookedOn: string;
  Status: string;
  Action: string;
}


@Component({
  selector: 'app-user-appointment',
  templateUrl: './user-appointment.component.html',
  styleUrls: ['./user-appointment.component.css']
})
export class UserAppointmentComponent {
  displayedColumns: string[] = ['No','Doctor','Scheduled','BookedOn','Status','Action'];
  dataSource!:MatTableDataSource<any>;

  constructor(private userService:UserService){}

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
            Doctor: booking.doctorId.fullName,
            Scheduled: booking.slotBooked,
            BookedOn: booking.updatedAt.split(' ')[0],
            Status: booking.status
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

}
