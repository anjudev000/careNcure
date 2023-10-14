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
  @Input() isDoctor!:boolean;
  block = true;
  isappoved:boolean=false;
  blockedUsers: string[] = [];
 @Input() displayedColumns!: string[];
 @Input() dataSource!: MatTableDataSource<UserData | DoctorData>;
 @Output() blockUser:EventEmitter<{Id:string,isblock:boolean}> = new EventEmitter<{Id:string,isblock:boolean}>();
 @Output() approveDoctor:EventEmitter<{doctorId:string}> = new EventEmitter<{doctorId:string}>
 @Output() rejectDoctor:EventEmitter<{doctorId:string}> = new EventEmitter<{doctorId:string}>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

blkUnblk(Id:string,isblock:boolean){
  
this.blockUser.emit({Id,isblock})
}
approve(doctorId:string){
 
  this.approveDoctor.emit({doctorId})
}
reject(doctorId:string){
  this.rejectDoctor.emit({doctorId})
}
 
}
