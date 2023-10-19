import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from 'src/app/shared/user.service';
import { UserProfile } from 'src/app/shared/userProfile.model';
import { Address } from 'src/app/shared/userProfile.model';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {
  selectedFileName: string = '';
  editForm!: FormGroup;
  userdata!: UserProfile;


  constructor(private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<ProfileEditComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: { userData: UserProfile }
  ) {
    this.userdata = data.userData
      
      this.editForm = fb.group({
        fullName: [this.userdata.fullName || ''],
        email: [this.userdata.email || ''],
        mobile_num: [this.userdata.mobile_num || ''],
        dob: [this.userdata.dob || ''],
        gender: [this.userdata.gender || ''],
        bloodGroup: [this.userdata.bloodGroup || ''],
        profilePic: [''],

        address: this.fb.group({
          houseName: [(this.userdata.address && this.userdata?.address[0]?.houseName) || ''],
          houseNumber: [(this.userdata.address && this.userdata?.address[0]?.houseNumber) || ''],
          street: [(this.userdata.address && this.userdata.address[0]?.street) || ''],
          city: [(this.userdata.address && this.userdata.address[0]?.city) || ''],
          state: [(this.userdata.address && this.userdata.address[0]?.state) || ''],
          pincode: [(this.userdata.address && this.userdata.address[0]?.pincode) || '']
        })
      })
    
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    this.selectedFileName = selectedFile.name;

    // Set the selected file in the form control
    this.editForm.get('profilePic')?.setValue(selectedFile);
  }

  onFormSubmit() {
      const formData = new FormData();
      formData.append('fullName', this.editForm.get('fullName')?.value);
      formData.append('email', this.editForm.get('email')?.value);
      formData.append('mobile_num', this.editForm.get('mobile_num')?.value);
      if(this.editForm.get('dob')?.value){
      formData.append('dob', this.editForm.get('dob')?.value);
      }
      formData.append('gender', this.editForm.get('gender')?.value);
      formData.append('bloodGroup', this.editForm.get('bloodGroup')?.value);
      if(this.editForm.get('profilePic')?.value){
        formData.append('profilePic', this.editForm.get('profilePic')?.value);
     }


      const address = this.editForm.get('address');
      formData.append('address[houseName]', address?.get('houseName')?.value);
      formData.append('address[houseNumber]', address?.get('houseNumber')?.value);
      formData.append('address[street]', address?.get('street')?.value);
      formData.append('address[city]', address?.get('city')?.value);
      formData.append('address[state]', address?.get('state')?.value);
      formData.append('address[pincode]', address?.get('pincode')?.value);

      // Send the formData to your backend API
      const userId = this.userService.getUserId();
       this.userService.updateUserProfile(userId,formData).subscribe(
        (response) => {
          this._snackBar.open('Profile updated successfully', 'Close', {
            duration: 2000,
          });
           this._dialogRef.close(true);
        },
        (error) => {
          // Handle error, e.g., show an error message
          this._snackBar.open('Error updating profile', 'Close', {
            duration: 2000,
          });
        }
      );
  }


}
