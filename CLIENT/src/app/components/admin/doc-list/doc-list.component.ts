import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorData } from 'src/app/data-table/data-table.component';
import { AdminService } from 'src/app/shared/admin.service';

interface ApiResponse{
  doctors:DoctorData[];
}

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})
export class DocListComponent {
  doctorColumns:string[] = ['fullName','mobile_num','email','Action'];
  dataSource!:MatTableDataSource<DoctorData>
  constructor(private adminService:AdminService,
    private _snackBar:MatSnackBar
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
            console.error('Unexpected API response:', res);

          }
        },
        error:(err)=>{
          console.error('API request error:', err);

        }
      });
    }
}
