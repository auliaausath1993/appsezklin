import { ServiceService } from './servive/service.service';
import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private serveiceService: ServiceService,
    private navCtrl : NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.Auth();
    });
  }

  Auth(){
    this.serveiceService.authenticationState.subscribe((data) => {
      if(data==true) {
        this.navCtrl.navigateRoot(['indexmenu']);
      }else{
        this.navCtrl.navigateRoot(['login']);
      }
    })
  }
}
