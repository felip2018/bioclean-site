import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navigationMenu } from '../config/navigationMenu';
import { SS_USER_DATA } from '../config/storageKeys';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  isHidden = false;
  showCloseMenu = false;
  showOpenMenu = false;
  menu: any[] = [];
  userData: any;

  constructor(private storageService: StorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.userData = JSON.parse(this.storageService.getItem(SS_USER_DATA) || '{}');
    this.menu = navigationMenu[this.userData.perfil ? this.userData.perfil : 'Default'];
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

  closeSession() {
    this.storageService.clearAll();
    this.router.navigate(['/home']);
  }
}
