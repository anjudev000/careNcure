import { Component,Inject } from '@angular/core';
import { FormGroup,FormBuilder,FormArray, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/shared/doctor.service';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface DialogData{
  id:string;
  appointmentID:string;
  userId:string
}

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent {

  prescriptionForm!:FormGroup;

  constructor(private doctorservice:DoctorService,
    private fb:FormBuilder,
    private _dialogRef:MatDialogRef<PrescriptionComponent>,
    private _snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data:DialogData
    ){
      this.prescriptionForm = fb.group({
        appId: [{value:this.data.appointmentID,disabled:true}],
        diagnosis:['',Validators.required],
        medicines: fb.array([]),
        advice:['',Validators.required],

      });
    }
    
    get medicines(){
      return this.prescriptionForm.get('medicines') as FormArray;
    }
    get dosage(){
      return ['Once Daily','Twice daily','Thrice daily','Once daily before food',
      'Twice daily before food','Thrice daily before food','Once daily after food',
      'Twice daily after food','Thrice daily after food'];
    }
    addMedicine() {
      this.medicines.push(this.createMedicineGroup());
    }
  
    // Method to remove a medicine group from the FormArray
    removeMedicine(index: number) {
      this.medicines.removeAt(index);
    }
  
    // Method to create a FormGroup for each medicine
    createMedicineGroup() {
      return this.fb.group({
        medicine: ['', Validators.required],
        dosage: ['', Validators.required]
      });
    }

    onSubmit(){
      console.log(49,'ok',this.prescriptionForm.value);
      const prescriptionData = this.prescriptionForm.value;
      this.doctorservice.generatePrescription(this.data.id,prescriptionData).subscribe({
        next:(res)=>{
          this._snackBar.open('Prescription Added Successfully','Close',{duration:3000});
          this._dialogRef.close(true)
        },
        error:(err)=>{
          this._snackBar.open(err.message,'Close',{duration:3000});

        }
      })
      
    }
}
