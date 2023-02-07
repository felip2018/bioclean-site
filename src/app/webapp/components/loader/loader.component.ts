import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, AfterViewInit {

  @Input() showLoader = false;

  constructor() {
  }

  ngOnInit(): void {
    // console.log('LoaderComponent.ngOnInit().showLoader > ', this.showLoader);
  }

  ngAfterViewInit(): void {
    // console.log('LoaderComponent.ngAfterViewInit().showLoader > ', this.showLoader);
  }

}
