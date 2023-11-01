import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent {

  messageForm!:FormGroup;
  constructor(private fb:FormBuilder,
    private _dialogRef:MatDialogRef<MessageDialogComponent>
    ){
    this.messageForm= this.fb.group({
      messageInput : ['',Validators.required]
    });
  }

  onSubmit(){
    if(this.messageForm.valid){
    const formData = this.messageForm.value;
    this._dialogRef.close(formData);
    }
  }
}
