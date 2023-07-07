import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit  } from '@angular/core';
import { GraphComponent } from '../../components/graph/graph.component';
import { StorageService } from '../../services/storage.service';
import { SS_USER_DATA } from '../../config/storageKeys';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  profile: string;
  userData: any;

  constructor(private storageService: StorageService) {
    this.profile = '';
  }

  ngOnInit(): void {
    this.userData = JSON.parse(this.storageService.getItem(SS_USER_DATA) || '{}');
    this.profile = this.userData.perfil ? this.userData.perfil : 'Default';
  }

}
