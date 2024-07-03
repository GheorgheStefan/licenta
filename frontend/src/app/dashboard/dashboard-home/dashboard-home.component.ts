import {Component, OnInit} from '@angular/core';
import {DashboardNavBarComponent} from "../dashboard-components/dashboard-nav-bar/dashboard-nav-bar.component";
import {Chart, ChartModule} from "angular-highcharts";
import {StatistiscService} from "./statistisc.service";

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

  deliveredOrders!: any;
  deliveringOrders!: any;
  pendingOrders!: any;

  numberOfAdmins!: any;
  numberOfBuyers!: any;
  numberOfDeliverers!: any;

  numberOfProductsAccessories!: number | null;
  numberOfProductsClothing!: number | null;
  numberOfProductsFootwear!: number | null;
  // private numberOfProductsAccessories: number | null;





  constructor( private statService: StatistiscService) {
  }

  ngOnInit(): void {
     this.statService.getStatistics().subscribe((data: any) => {
       this.deliveredOrders = data.deliveredOrders;
       this.deliveringOrders = data.deliveringOrders;
       this.pendingOrders = data.pendingOrders;

       this.numberOfAdmins = data.numberOfAdmins;
       this.numberOfBuyers = data.numberOfBuyers;
       this.numberOfDeliverers = data.numberOfDeliverers;

       this.numberOfProductsAccessories = data.numberOfProductsAccessories;
       this.numberOfProductsClothing = data.numberOfProductsClothing;
       this.numberOfProductsFootwear = data.numberOfProductsFootwear;


       const rawData: [string, number][] = [
         ['Jan', 0],
         ['Feb', 2000],
         ['Mar', 15520],
         ['Apr', 0],
         ['May', 0],
         ['Jun', 2400],
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
             ['Footwear', this.numberOfProductsFootwear],
             ['Clothing', this.numberOfProductsClothing],
             {
               name: 'Accessories',
               y: this.numberOfProductsAccessories,
               sliced: true,
               selected: true
             }
           ]
         }]
       });
    });


  }






}

