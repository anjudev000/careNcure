import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../data-table/data-table.component';
import { UserListComponent } from '../components/admin/user-list/user-list.component';
import { DocListComponent } from '../components/admin/doc-list/doc-list.component';
import { MessageDialogComponent } from '../components/admin/pending-doc/message-dialog/message-dialog.component';
import { PendingDocComponent } from '../components/admin/pending-doc/pending-doc.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DataTableComponent,
    UserListComponent,
    DocListComponent,
    MessageDialogComponent,
    PendingDocComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports:[
    DataTableComponent,
    UserListComponent,
    DocListComponent,
    MessageDialogComponent,
    PendingDocComponent
  ]
})
export class AdminModule { }
