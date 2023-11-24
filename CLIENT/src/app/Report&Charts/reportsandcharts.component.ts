import { Component, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-reportsandcharts',
  templateUrl: './reportsandcharts.component.html',
  styleUrls: ['./reportsandcharts.component.css']
})
export class ReportsandchartsComponent implements OnChanges {
  @ViewChild('myChart', { static: true }) myChart!: ElementRef;
  @ViewChild('myChart2', { static: true }) myChart2!: ElementRef;

  @Input() totalAppointments: number = 0;
  @Input() monthlyAppointmentsRevenue!: number[];
  @Input() monthlyAppointments!:number[];
  @Input() annualRev: number = 0;
  @Input() weeklyRev: number = 0;
  @Input() monthlyRev: number = 0;
  @Input() labels!: string[];
  @Input() totalAdminRevenue:number=0;
  @Input() isAdmin!:boolean;


  ngOnChanges() {
    this.renderChart();
    this.renderChart2();
  }

  renderChart() {
    //console.log(19,'inside chart componnet',this.labels);
    const chartCanvas = this.myChart.nativeElement.getContext('2d');
    new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Monthly Revenue',
          data: this.monthlyAppointmentsRevenue,
          backgroundColor: 'Orange',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  renderChart2(){
    const chartCanvas = this.myChart2.nativeElement.getContext('2d');
    new Chart(chartCanvas, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Total Appointments',
          data: this.monthlyAppointments,
          backgroundColor: 'blue',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
