import { Component } from '@angular/core';
import { Platform,NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: 'success.page.html',
  styleUrls: ['success.page.scss'],
})
export class SuccessPage {

  constructor(
    private nav:NavController,
    private router: Router
  ) {}

  goHome(){
    this.router.navigateByUrl('indexmenu');
  }
}
