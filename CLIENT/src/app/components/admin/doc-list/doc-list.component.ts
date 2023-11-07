import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorData } from 'src/app/data-table/data-table.component';
import { AdminService } from 'src/app/shared/admin.service';
import Swal from 'sweetalert2';

interface ApiResponse{
  doctors:DoctorData[];
}


@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})
export class DocListComponent {
  isDoctor!:boolean
   doctorColumns:string[] = ['fullName','mobile_num','email',
  'RegnNumber','specialization','status','Action'];
//   doctorColumns: { apiHeader: string, customHeader: string }[] = [
//     { apiHeader: 'fullName', customHeader: 'Name' },
//     { apiHeader: 'mobile_num', customHeader: 'Phone'},
//     { apiHeader: 'email', customHeader: 'Email'},
//     { apiHeader: 'RegnNumber', customHeader: 'Registration'},
//     { apiHeader:'specialization',customHeader: 'Department'},
//     { apiHeader:'status',customHeader: 'Status'},
//     { apiHeader: '',customHeader: 'Action'}
//  ]
  dataSource!:MatTableDataSource<DoctorData>
  constructor(private adminService:AdminService,
    private _snackBar:MatSnackBar,
    private _dialog:MatDialog
    ){}

    ngOnInit(){
      this.getAllDoctors();
    }

    getAllDoctors(){
      this.adminService.getAllDoctors().subscribe({
        next:(res)=>{
          if(res && ((res as ApiResponse).doctors)){
            const docArray = ((res as ApiResponse).doctors);
            
            this.dataSource = new MatTableDataSource<DoctorData>(docArray);
          }else{
            console.log('Unexpected API response:', res);

          }
        },
        error:(err)=>{
          console.log('API request error:', err);

        }
      });
    }

    handleblock(doctorId:string,isblocked:boolean){
      const confirmationMessage = isblocked ? 'Do you want to unblock this user?' : 'Do you want to block this user?';
      Swal.fire({
        title:'Confirmation',
        text:confirmationMessage,
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:'Yes',
        cancelButtonText:'No'
      }).then((result)=>{
        if(result.isConfirmed){
          
          const apimethod = isblocked? this.adminService.postDoctorBlockUnblock(doctorId):this.adminService.postDoctorBlockUnblock(doctorId);
          apimethod.subscribe({
            next:(res)=>{
              const updatedRow = this.dataSource.data.find((row)=>row._id === doctorId);
              if(updatedRow){
                updatedRow.isblock=!isblocked;
              }
              this._snackBar.open(isblocked ? 'Doctor Unblocked' : 'Doctor Blocked', 'Close', { duration: 3000 });

            },
            error:(err)=>{
              console.log('error in blocking:',err);
              
            }
          })
        }
      })
    }

}
