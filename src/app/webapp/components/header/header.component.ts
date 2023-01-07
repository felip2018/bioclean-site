import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title = '';
  @Output() hideShowMenu = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  hideShowMenuEvent() {
    this.hideShowMenu.emit();
  }
}
