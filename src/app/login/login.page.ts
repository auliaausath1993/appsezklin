import { ServiceService } from './../servive/service.service';
import { Component } from '@angular/core';
import { Platform, NavController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ignoreElements } from 'rxjs/operators';
import { NavigationExtras } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  FormLogin:FormGroup;
  dataLogin:any;

  constructor(
    private nav:NavController,
    private formBuilder: FormBuilder,
    public loadingController : LoadingController,
    public modalController : ModalController,
    private platform : Platform,
    public toastController : ToastController,
    private serviceService : ServiceService,
    private AuthGuard:AuthGuard
  ) {}

  ngOnInit() {
    this.FormLogin=this.formBuilder.group({
      phone : ['', Validators.required]
    });
  }
  ionViewWillEnter() {

  }

  async loginApiFunc() {
    const loading = await this.loadingController.create({
      message : 'Please wait...'
    });

    await loading.present();

    this.serviceService.checkNumber(this.FormLogin.value, 'auth/login').subscribe(
      data => {
        this.dataLogin=data;
        if(this.dataLogin.status !== 'success') {
          let message='Nama pengguna dan kata sandi yang Anda masukkan tidak cocok. Silahkan periksa dan coba lagi.';
          console.log(message);
          this.presentToast(message)
          loading.dismiss();
        }else{
          loading.dismiss();
          this.goLogin();
        }

        
      },
      error => {
        if(error.status == 422) {
          let message='No Handphone Belum Terdafar';
          console.log(message)
          this.presentToast(message);
        }else{
          let message='Tidak dapat memproses permintaan anda';
          console.log(message)
          this.presentToast(message);
        }
        loading.dismiss();
        
      }
    )
  }

  async presentToast(Message) {
    const toast = await this.toastController.create({
      message : Message,
      duration: 2500,
      position : "bottom"
    });
    toast.present();
  }
  
  goLogin(){

    let navigationExtras : NavigationExtras = {
      state : {
        phone : this.FormLogin.value.phone
      }
    }
    this.nav.navigateForward('verification', navigationExtras);
  }

  goRegister(){
    this.nav.navigateForward('register');
  }
}
