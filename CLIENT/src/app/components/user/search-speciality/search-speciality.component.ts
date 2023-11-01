import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

interface Department{
  deptName:string
}


@Component({
  selector: 'app-search-speciality',
  templateUrl: './search-speciality.component.html',
  styleUrls: ['./search-speciality.component.css']
})
export class SearchSpecialityComponent {
  myControl = new FormControl('');
  options: string[] = [
    'Internal medicine','Pediatrics','Orthopedics','Urology','Psychiatry',
    'Emergency medicine','Neurology','Pathology','Anesthesiology','Obstetrics and gynaecology',
    'Ophthalmology','Dermatology','Family medicine','Gastroenterology','Oncology','Neurosurgery',
    'Otorhinolaryngology','Nephrology','Rheumatology','Geriatric medicine','Cardiology','Sports medicine',
    'General surgery'];
  filteredOptions!: Observable<string[]>;

  constructor(private userService:UserService,private router:Router){}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onDeptSelected(deptName:Department){
    console.log(36666,deptName);
    this.router.navigate(['/search-doctors',{deptName:deptName}]);
 }
}
