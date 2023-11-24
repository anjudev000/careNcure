import { Component,ViewChild,ElementRef,Input } from '@angular/core';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-reportsandcharts',
  templateUrl: './reportsandcharts.component.html',
  styleUrls: ['./reportsandcharts.component.css']
})
export class ReportsandchartsComponent {
  @ViewChild('myChart', { static: true }) myChart!: ElementRef;
  @Input()  totalAppointments:number=0;
  @Input() weeklyAppointments:any;
  @Input() annualRev:number=0;
  @Input() weeklyRev:number=0;
  @Input() monthlyRev:number=0;
  @Input() labels:any=''
  ngOnInit(){
    const chartCanvas = this.myChart.nativeElement.getContext('2d');
    new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: this.labels,
      datasets: [{
        label: 'No.of Appointments',
        data: this.weeklyAppointments,
        backgroundColor: 'blue',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes:[{
          ticks: {
            beginAtZero: true
          }
        }] 
      }
    }
  });
  }
}
