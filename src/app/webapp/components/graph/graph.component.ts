import { Component, OnInit } from '@angular/core';

import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  standalone: true,
  imports: [
    HighchartsChartModule,
  ]
})
export class GraphComponent implements OnInit {

  Highcharts = Highcharts;
  linechart: any = {
    series: [
      {
        data: [1, 2, 3],
      },
    ],
    chart: {
      type: 'line',
    },
    title: {
      text: 'linechart',
    },
  };

  constructor() { }

  ngOnInit(): void {
  }

}
