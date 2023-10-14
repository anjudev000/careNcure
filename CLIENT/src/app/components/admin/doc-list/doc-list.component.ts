import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorData } from 'src/app/data-table/data-table.component';
import { AdminService } from 'src/app/shared/admin.service';
import Swal from 'sweetalert2';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';

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
  doctorColumns:string[] = ['fullName','mobile_num','email','status','RegnNumber','Action'];
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
            console.log(34,docArray);
            
            this.dataSource = new MatTableDataSource<DoctorData>(docArray);
          }else{
            console.error('Unexpected API response:', res);

          }
        },
        error:(err)=>{
          console.error('API request error:', err);

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

    handleApprove(doctorId:string){
      Swal.fire({
        title:'Confirmation',
        text: 'Approve the Doctor?',
        icon:'question',
        showCancelButton: true,
        confirmButtonText:'Confirm',
        cancelButtonText:'Don\'t Approve'
      }).then((result)=>{
        if(result.isConfirmed){
          this.adminService.postDocApproval(doctorId).subscribe({
            next:(res)=>{
              this._snackBar.open('Doctor Approved','Close',{duration:3000});
              this.dataSource.data = this.dataSource.data.map((row)=>{
                if(row._id === doctorId){
                  return {...row,status:'Approved'};
                }
                return row;
              })
            },
            error:(err)=>{
              console.log('error in blocking:',err);
    
            }
          });
        }
      });
     
    }

    handleRejection(doctorId:string){
      Swal.fire({
        title:'Confirmation',
        text:'Rejecting the doctor?',
        icon:'question',
        showCancelButton:true,
        confirmButtonText:'Confirm',
        cancelButtonText:'Don\'t reject'
      }).then((result)=>{
        if(result.isConfirmed){
         const dialogRef = this._dialog.open(MessageDialogComponent);
          dialogRef.afterClosed().subscribe({
            next:(res)=>{
              console.log(132,res);
              this.adminService.postDocRejection(doctorId,res).subscribe({
                next:(res)=>{
                  this._snackBar.open('Doctor rejected','Close',{duration:3000});
                  this.dataSource.data = this.dataSource.data.map((row)=>{
                    if(row._id === doctorId){
                      return {...row,status:'Rejected'};
                    }
                    return row;
                  })
                },
                error:(err)=>{

                }
              })
               }
          });
        
          
        }
      })
    }
}
