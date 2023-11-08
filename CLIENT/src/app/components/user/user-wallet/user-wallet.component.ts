import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/user.service';

interface ApiResponse{
  userWalletAmount:number
}

@Component({
  selector: 'app-user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.css']
})
export class UserWalletComponent {

  userId:string ='';
  walletAmount:number = 0;
  constructor(
    private userService:UserService,
    private _dialoRef: MatDialogRef<UserWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string }
  ){
    this.userId = data.userId;
    this.userService.getWallet(this.userId).subscribe({
      next:(res)=>{
        this.walletAmount = ((res as ApiResponse).userWalletAmount);
        console.log(this.walletAmount);
        
      }
    })
   }

 
}
