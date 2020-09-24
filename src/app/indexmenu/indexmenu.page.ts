import { Component } from '@angular/core';
import { Platform,NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-indexmenu',
  templateUrl: 'indexmenu.page.html',
  styleUrls: ['indexmenu.page.scss'],
})
export class IndexmenuPage {

  constructor(
    private nav:NavController,
    private router: Router,
  ) {
  }
  
  public home = function(){
    this.router.navigateByUrl('/home');
  }
}
