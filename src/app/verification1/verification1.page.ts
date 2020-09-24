import { Component } from '@angular/core';
import { Platform,NavController } from '@ionic/angular';

@Component({
  selector: 'app-verification1',
  templateUrl: 'verification1.page.html',
  styleUrls: ['verification1.page.scss'],
})
export class Verification1Page {

  constructor(
    private nav:NavController,
  ) {}

  goSyarat(){
    this.nav.navigateForward('syarat');
  }
}
