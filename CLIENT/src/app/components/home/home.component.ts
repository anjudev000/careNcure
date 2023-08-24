import { Component } from '@angular/core';
  interface Location {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent {
  selectedValue!: string;
  locations: Location[] = [
    {value: 'Bengaluru-0', viewValue: 'Bengaluru'},
    {value: 'Kochi-1', viewValue: 'Kochi'},
    {value: 'Calicut-2', viewValue: 'Calicut'},
  ];
  ngOnInit(): void {
    const video = document.querySelector('video') as HTMLVideoElement;
    video.autoplay = true;
    video.muted = true;
    video.controls=false;
    video.loop=true;
  }
}
