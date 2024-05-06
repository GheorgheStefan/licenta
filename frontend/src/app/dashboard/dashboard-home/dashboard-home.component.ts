import { Component } from '@angular/core';
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
export class DashboardHomeComponent {

  constructor() {
  }

  lineChart = new Chart({
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      title: {
        text: 'Sales'
      }
    },
    series: [{
      type: 'line', // Add the type property here
      name: 'Sales',
      data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200]
    }]
  });

  pieChart = new Chart({
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
        ['Footwear', 45.0],
        ['Apparel', 26.8],
        {
          name: 'Accessories',
          y: 12.8,
          sliced: true,
          selected: true
        },
        ['Electronics', 8.5],
        ['Home Goods', 6.2],
        ['Other', 0.7]
      ]
    }]
  });

}

