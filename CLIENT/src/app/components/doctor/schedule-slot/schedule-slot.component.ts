import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/shared/doctor.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ApiResponse {
  slotsForDate: string[];
}

@Component({
  selector: 'app-schedule-slot',
  templateUrl: './schedule-slot.component.html',
  styleUrls: ['./schedule-slot.component.css']
})
export class ScheduleSlotComponent {
  slotsForDate: string[] = []
  timeSlots: string[] = [
    '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19.30'
  ]
  timeslotForm!: FormGroup;
  addedSlotData: { date: string, timeslots: string[] }[] = [];
  selectedButtonIndices: number[] = [];
  datePipe = new DatePipe('en-US');
  minDate!:string
  

  constructor(private fb: FormBuilder,
    private doctorService: DoctorService,
    private _snackBar:MatSnackBar
    ) {
    this.timeslotForm = fb.group({
      date: ['', Validators.required],
      selectedSlot: [[]]
    });
    
  }
  ngOnInit() {
    const formattedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    if (formattedDate !== null) {
      this.minDate = formattedDate;
    } else {
      // Handle the case when datePipe.transform returns null, e.g., set a default value.
      this.minDate = ''; // Or any other suitable default value
    }
  }
  
  changeDateFormat(date: string) {
    const dateobj = new Date(date);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = dateobj.toLocaleDateString(undefined, options as Intl.DateTimeFormatOptions);
    return formattedDate;
  }
  onDateChange(selectedDate: string) {
    const formattedDate = this.changeDateFormat(selectedDate);
    const doctorId = this.doctorService.getDoctorId();
    this.doctorService.getAvailSlots(doctorId, formattedDate).subscribe({
      next: (res) => {
        const data = ((res as ApiResponse).slotsForDate)
        this.addedSlotData.push({date: formattedDate, timeslots: data})
        console.log(60,this.addedSlotData);
       this.updateSelectedButtonIndices(data);
      },
      error: (err) => {

        console.log(err.message);

      }
    })
  }
  updateSelectedButtonIndices(timeslotsdata: any[]) {
    this.selectedButtonIndices = [];
    for (const slot of timeslotsdata) {
      const index = this.timeSlots.indexOf(slot);
      if (index !== -1) {
        this.selectedButtonIndices.push(index);
      }
    }
  }


  handleButton(index: number, timeslot: string) {
    
    const currentDate = this.timeslotForm.get('date')?.value;
    const formattedDate = this.changeDateFormat(currentDate);
    const isSlotSelected = this.selectedButtonIndices.includes(index);
  
    // Find the existing date in addedSlotData
    const existingDate = this.addedSlotData.find((i) => i.date === formattedDate);
  
    if (isSlotSelected) {
      console.log(94,this.addedSlotData);
      
      const abcd = this.addedSlotData.filter((obj)=>obj.date === formattedDate);
      console.log(95,abcd);
      
      const newArray = abcd[0].timeslots.filter(time => time !== timeslot)
      abcd[0].timeslots = newArray
      
      this.selectedButtonIndices = this.selectedButtonIndices.filter(times => times !== index);
    } else {
      const abcd = this.addedSlotData.filter((obj)=>obj.date === formattedDate);
      abcd[0].timeslots.push(timeslot)
      this.selectedButtonIndices.push(index);
    }
  }
  

  onSubmit() {
    const doctorId = this.doctorService.getDoctorId();
    
    this.doctorService.addTimeSlots(doctorId, this.addedSlotData).subscribe({
      next: (res) => {
        this._snackBar.open('SLOTS ADDED SUCCESSFULLY','Close',{duration:3000})

      }, error: (err) => {
        console.log(err.message);

      }
    })
    this.timeslotForm.reset();
    this.addedSlotData = [];
  }
}
