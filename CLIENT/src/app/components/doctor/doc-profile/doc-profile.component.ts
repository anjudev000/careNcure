import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from 'src/app/shared/doctor.service';
import { doctorProfile } from 'src/app/shared/doctorProfile.model';
import { DocProfileEditComponent } from './doc-profile-edit/doc-profile-edit.component';


interface ApiResponse{
  doctorData:doctorProfile
}

@Component({
  selector: 'app-doc-profile',
  templateUrl: './doc-profile.component.html',
  styleUrls: ['./doc-profile.component.css']

})
export class DocProfileComponent {

  data!:doctorProfile;

  constructor( private  doctorService:DoctorService,
    private _dialog:MatDialog
    ){}

  ngOnInit(){
    console.log(29,this.data?.profilePic);
    
    this.getDocDetails();
  }

  getDocDetails(){
    const doctorId=this.doctorService.getDoctorId();
    this.doctorService.getDoctorDetails(doctorId).subscribe({
      next:(res)=>{
        this.data = ((res as ApiResponse).doctorData);
        
        
      },
      error:(err)=>{
        console.log('API request error',err);
        
      }
    })
  }

  opendocDialog(){
  const dialogRef = this._dialog.open(DocProfileEditComponent,{
    data:{doctorData:this.data}
  });

  dialogRef.afterClosed().subscribe({
    next:(res)=>{
      if(res){
        this.getDocDetails();
      }
    }
  })
  }
}
