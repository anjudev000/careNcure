import { Injectable } from '@angular/core';

interface Doctor {
  _id: string;
  fullName: string;
  mobile_num: string;
  profilePic: string;
  education: Education[];
  experience: Experience[];
  description?: string; 
  specialization?: string; 
  fee?: number; 
  slots: Slot[];
}

interface Education {
  degree: string;
  college: string;
  graduation_year: string;
}

interface Experience {
  hospital: string;
  term: number;
}

interface Slot {
  date: string;
  timeslots: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DoctorDataService {
selectedDoctor!:Doctor;
  constructor() { }

  setDoc(doctor:Doctor){
    this.selectedDoctor=doctor;
  }
  getDoc(){
    return this.selectedDoctor
  }
}
