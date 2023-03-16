import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  @Input() title: string = 'TITULO';
  @Input() value: number | string = '100';
  @Input() icon: string = 'fa fa-home';
  @Input() backgroundColor: string = '#ee5253';

  constructor() { }

  ngOnInit(): void {
  }

}
