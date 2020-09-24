import { Component } from '@angular/core';
import { Platform, NavController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { ServiceService } from './../servive/service.service';
@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {

  set_data:any;
  username:any;
  constructor(
    private nav:NavController,
    private serviceService : ServiceService
  ) {}
  ionViewWillEnter() {
    this.serviceService.CekUser().subscribe(data=>{
      this.set_data = data;
      this.username = this.set_data.data.name;
    });
  }
  editProfile(){
    this.nav.navigateForward('formprofile');
  }
  logout(){
    this.serviceService.logout();
  }
}
