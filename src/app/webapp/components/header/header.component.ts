import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title = '';
  @Input() showButton = false;
  @Output() showRegisterFormEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  showRegisterForm() {
    this.showRegisterFormEvent.emit();
  }
}
