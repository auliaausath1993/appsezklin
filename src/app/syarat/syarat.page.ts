import { Component } from '@angular/core';
import { Platform,NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-syarat',
  templateUrl: 'syarat.page.html',
  styleUrls: ['syarat.page.scss'],
})
export class SyaratPage {

  constructor(
    private nav:NavController,
    private router: Router
  ) {}
  goHome(){
    this.router.navigateByUrl('indexmenu');
  }
}