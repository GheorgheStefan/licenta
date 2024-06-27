import {Component, OnInit} from '@angular/core';
import {DashboardNavBarComponent} from "../dashboard-components/dashboard-nav-bar/dashboard-nav-bar.component";
import {Chart, ChartModule} from "angular-highcharts";

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  templateUrl: './dashboard-home.component.html',
  imports: [
    DashboardNavBarComponent,
    ChartModule
  ],
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit{
  mounths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  salesData: number[] = [];
  lineChart!: Chart;
  pieChart!: Chart;

  constructor() {
  }

  ngOnInit(): void {
    const rawData: [string, number][] = [
      ['Jan', 20000],
      ['Feb', 10000],
      ['Mar', 30000],
      ['Apr', 40000],
      ['May', 50000],
      ['Jun', 60000],
      ['Jul', 70000],
      ['Aug', 50000],
      ['Sep', 30000],
      ['Oct', 40000],
      ['Nov', 20000],
      ['Dec', 10000]
    ];
     this.salesData = this.mounths.map(month => {
      const data = rawData.find(d => d[0] === month);
      return data ? data[1] : 0;
    });
    this.lineChart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Monthly Sales'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.mounths
      },
      yAxis: {
        title: {
          text: 'Sales'
        }
      },
      series: [{
        type: 'line', // Add the type property here
        name: 'Sales',
        data: this.salesData
      }]
    });

    this.pieChart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Sales by Category'
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: 'Sales',
        data: [
          ['Footwear', 20],
          ['Clothing', 30],
          {
            name: 'Accessories',
            y: 40,
            sliced: true,
            selected: true
          }
        ]
      }]
    });
  }






}

