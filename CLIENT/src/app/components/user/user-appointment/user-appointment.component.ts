import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from 'src/app/shared/socket.service';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;




interface ApiResponse {
  bookings: any
}
interface Booking {
  _id: string;
  userId: string;
  email: string;
  Doctor: string;
  Scheduled: string;
  BookedOn: string;
  Status: string;
  Action: string;
  isCancelled: boolean;
  
}

interface PrescriptionDetails {
  advice: string;
  diagnosis: string;
  prescription: { medicine: string; dosage: string }[];
}

type Margins = [number, number, number, number];



@Component({
  selector: 'app-user-appointment',
  templateUrl: './user-appointment.component.html',
  styleUrls: ['./user-appointment.component.css']
})
export class UserAppointmentComponent {

  displayedColumns: string[] = ['No', 'Doctor', 'Scheduled', 'BookedOn', 'Status', 'Action'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private userService: UserService,
    private socketService: SocketService,
    private router: Router,
    private _snackBar: MatSnackBar,

  ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getAppointmentData();
  }

  getAppointmentData() {
    const userId = this.userService.getUserId();
    this.userService.getApppointmentData(userId).subscribe({
      next: (res) => {
        const data = ((res as ApiResponse).bookings);
        console.log(42222, data);
        // console.table(433333,data)
        const bookings: Booking[] = data.map((booking: any) => {
          return {
            _id: booking._id,
            userId: booking.userId,
            email: booking.userId.email,
            Doctor: booking.doctorId.fullName,
            Scheduled: booking.slotBooked,
            BookedOn: booking.updatedAt.split(' ')[0],
            Status: booking.status,
            isCancelled: booking.status === 'Cancelled' ? true : false

          };
        });
        console.log(bookings, 5222);
        this.dataSource = new MatTableDataSource(bookings);
      },
      error: (err) => {
        alert('Error fetching the data!');
      }
    })
  }

  cancelAppointment(id: string) {
    console.log(62, id);
    Swal.fire({
      title: 'Confirmation',
      text: 'Please confirm to cancel the appointment',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.cancelAppointment(id).subscribe({
          next: (res) => {
            const cancelledAppointment = this.dataSource.data.find(app => app._id === id);
            if (cancelledAppointment) {
              cancelledAppointment.isCancelled = true;
              this.dataSource.data = [...this.dataSource.data];
            }
            this._snackBar.open('Appointmnet has been cancelled, the fee is refunded to your wallet', 'Close', { duration: 4000 });
          }, error: (err) => {
            this._snackBar.open('Error occuring while cancelling', 'Close', { duration: 4000 });

          }
        })

      }
    })

  }

  joinCall(roomId: string, email: string, booking: any): void {
    const room = roomId;
    this.socketService.userRoomJoin({ email, room });
    const value = 'user';
    this.router.navigate([`user/call/${room}`], { state: { value: 'user' } });
  }

  generatePDF(element:any){
    this.userService.getPrescriptionDetails(element._id).subscribe({
      next:(res)=>{
        console.log(129,res);
        const advice = ((res as PrescriptionDetails).advice);
        const diagnosis = ((res as PrescriptionDetails).diagnosis);
        const prescription = ((res as PrescriptionDetails).prescription)
        for(let med of prescription){
          console.log(139,med);
          }
        
          const documentDefinition = {
            content:[
              {text: 'CareNCure',style:'header'},
              { text: 'Appointment Details', style: 'subheader' },
              { text: `Doctor: ${element.Doctor}`, style: 'subheader' },
              { text: `Date & Time: ${element.Scheduled}`, style: 'subheader' },
              { text: 'Prescription', style: 'subheader' },
              { text: `Diagnosis: ${diagnosis}`, style: 'prescription' },
              {
                ul: prescription.map(medicine => {
                  return `${medicine.medicine}: ${medicine.dosage}`;
                }),
                style: 'prescription'
              },
              { text: `Advice: ${advice}`, style: 'prescription' },
            ],
            styles: {
            
              header: { fontSize: 18, bold: true, margin: [0, 10, 50, 10] as Margins },
              contentHeader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] as Margins },
              subheader: { fontSize: 16, bold: true, margin: [0, 10, 0, 5] as Margins },
              prescription: { fontSize: 12, margin: [0, 5, 0, 5] as Margins },
            },
           
          }
      
          pdfMake.createPdf(documentDefinition).open();
        },
      error:(err)=>{
        console.log('error getting prescription details',err.message);
        
      }
    })
    
  }

}
