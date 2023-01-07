import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  isHidden = true;

  constructor() { }

  ngOnInit(): void {
  }

  hideShowMenu() {
    this.isHidden = !this.isHidden;
  }
}
