import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title = '';
  @Input() backUrl = '';
  @Input() showButton = false;
  @Input() showBackButton = false;
  @Input() showForm = false;
  @Output() showRegisterFormEvent = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showRegisterForm() {
    this.showRegisterFormEvent.emit();
  }

  openBackUrl() {
    if (this.backUrl) {
      this.router.navigate([this.backUrl]);
    }
  }
}
