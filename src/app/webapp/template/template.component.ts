import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  isHidden = false;
  showCloseMenu = false;
  showOpenMenu = false;

  constructor() { }

  ngOnInit(): void {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    const width = event.target.innerWidth;
    // console.log(`width:: ${width}`);
    let menuContainer = document.getElementById('menuContainer');
    if (width <= 992) {
      menuContainer?.classList.remove('menuContainerDesktop');
      menuContainer?.classList.add('menuContainerMobile');
      this.showCloseMenu = true;
      this.showOpenMenu = true;
    } else {
      menuContainer?.classList.remove('menuContainerMobile');
      menuContainer?.classList.add('menuContainerDesktop');
      this.showCloseMenu = false;
      this.showOpenMenu = false;
    }
  }

  hideShowMenu(status: boolean) {
    this.isHidden = status;
  }
}
