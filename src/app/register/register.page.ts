import { NavigationExtras } from '@angular/router';
import { ServiceService } from './../servive/service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Platform, NavController, LoadingController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {

  FormRegister:FormGroup;
  dataRegister: any;

  constructor(
    private nav:NavController,
    private formBuilder:FormBuilder,
    public loadingController:LoadingController,
    public modalController:ModalController,
    private platform : Platform,
    public toastController:ToastController,
    private serviceService:ServiceService
  ) {}

  ngOnInit() {
    this.FormRegister=this.formBuilder.group({
      phone : ['', Validators.required],
      name : ['', Validators.required],
      email : ['', Validators.nullValidator]
    })
  }

  async registerApiFunc() {
    const loading = await this.loadingController.create({
      message : 'Please wait...'
    })

    await loading.present();

    this.serviceService.registerApiService(
      this.FormRegister.value, 'auth/register'
    ).subscribe(
      data => {
        this.dataRegister=data;
        if(this.dataRegister.status !== 'success') {
          let message = 'Phone Number atau Email sudah pernah terdaftarkan';
          this.presentToast(message);
          loading.dismiss();
        }else{
          loading.dismiss();
          this.goVerification();
        }
      },
      error => {
        if(error.status == 422) {
          let message='Please Cek ulang form anda';
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

  goVerification(){
    let navigationExtras : NavigationExtras = {
      state : {
        phone : this.FormRegister.value.phone
      }
    }
    this.nav.navigateForward('verification1', navigationExtras);
  }
}
