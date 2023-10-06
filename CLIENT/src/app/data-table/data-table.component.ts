import { Component,AfterViewInit,ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  _id:string;
  fullName: string;
  mobile_num: string;
  email: string;
  isblock:boolean;
}
export interface DoctorData {
  _id:string;
  fullName: string;
  mobile_num: string;
  email: string;
  isblock:boolean;
}


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent  {
  block = true;
  blockedUsers: string[] = [];
 @Input() displayedColumns!: string[];
 @Input() dataSource!: MatTableDataSource<UserData | DoctorData>;
 @Output() blockUser:EventEmitter<{userId:string,isblock:boolean}> = new EventEmitter<{userId:string,isblock:boolean}>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

blkUnblk(userId:string,isblock:boolean){
  // isblock = !isblock ;
  // const updatedRow  = this.dataSource.data.find(row => row._id === userId);
  // if(updatedRow){
  //   updatedRow.isblock = isblock;
  // }
  this.blockUser.emit({userId,isblock})
}
 
}
