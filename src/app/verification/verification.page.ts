import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from './../servive/service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Platform, NavController, ToastController, ModalController, LoadingController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-verification',
  templateUrl: 'verification.page.html',
  styleUrls: ['verification.page.scss'],
})
export class VerificationPage {

  FormOTP: FormGroup;
  dataOtp: any;
  phoneParam: any;

  constructor(
    private nav:NavController,
    private formBuilder:FormBuilder,
    public toastController : ToastController,
    private serviceService : ServiceService,
    public modalController: ModalController,
    public route: ActivatedRoute,
    public router : Router,
    public loadingController : LoadingController
  ) {}

  ngOnInit() {

    this.phoneParam= this.router.getCurrentNavigation().extras.state.phone;
    this.FormOTP=this.formBuilder.group({
      first : ['', Validators.required],
      second : ['', Validators.required],
      third : ['', Validators.required],
      fourth : ['', Validators.required]
    })
  }

  
  async sendOtpConfirmation() {

    const loading = await this.loadingController.create({
      message : 'Please wait...'
    });
    const otpCode = this.FormOTP.value.first + this.FormOTP.value.second + this.FormOTP.value.third + this.FormOTP.value.fourth;
    let item = {
      otp : otpCode,
      phone : this.phoneParam
    }

    await loading.present();

    this.serviceService.confirmationOtp(item, 'auth/otp-confirmation').subscribe(
      data => {
        this.dataOtp=data;
        if(this.dataOtp.status !== 'success') {
          let message = 'Kode Otp yang Anda Masukkan Salah';
          this.presentToast(message)
          loading.dismiss();
        }else{
          loading.dismiss();
          this.goHome();
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

  goHome(){
    this.nav.navigateForward('indexmenu');
  }

  async presentToast(Message) {
    const toast = await this.toastController.create({
      message : Message,
      duration: 2500,
      position : "bottom"
    });
    toast.present();
  }

  otpController(event,next,prev){

    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
     return 0;
    } 
 }
}
