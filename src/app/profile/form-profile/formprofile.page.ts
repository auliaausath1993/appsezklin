import { Component } from '@angular/core';
import { ServiceService } from '../../servive/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Platform, NavController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formprofile',
  templateUrl: 'formprofile.page.html',
  styleUrls: ['formprofile.page.scss'],
})
export class FormProfilePage {

  FormEdit:FormGroup;
  set_data:any;
  id:any;
  username:any;
  email:any;
  phone:any;
  dataform:any;
  constructor(
    private formBuilder: FormBuilder,
    private serviceService : ServiceService,
    public loadingController : LoadingController,
    public modalController : ModalController,
    private platform : Platform,
    public toastController : ToastController,
    private router: Router,
  ) {}
  ngOnInit() {
    this.FormEdit=this.formBuilder.group({
        id:['', Validators.required],
        username : ['', Validators.required],
        email : ['', Validators.required],
        phone : ['', Validators.required]
    });
  }
  ionViewWillEnter() {
    this.serviceService.CekUser().subscribe(data=>{
      this.set_data = data;
      this.id = this.set_data.data.customer_id;
      this.username = this.set_data.data.name;
      this.email = this.set_data.data.email;
      this.phone = this.set_data.data.phone;
      if(this.username===undefined||this.username===null||this.username===''){
        this.serviceService.logout();
      }
    });
  }
  async EditpiFunc(){
    const loading = await this.loadingController.create({
        message : 'Please wait...'
      });
  
      await loading.present();
      this.serviceService.editProfile(this.FormEdit.value, 'edit_profile').subscribe(
        data => {
            this.dataform = data;
            if(this.dataform.status !== 'success') {
                let message='Tidak dapat memproses permintaan anda';
                this.presentToast(message)
                loading.dismiss();
              }else{
                let message='Profile berhasil diedit';
                this.presentToast(message)
                loading.dismiss();
              }
        },
        error => {
              let message='Tidak dapat memproses permintaan anda';
              console.log(message)
              this.presentToast(message);
            loading.dismiss();
          }
      );
  }

  async presentToast(Message) {
    const toast = await this.toastController.create({
      message : Message,
      duration: 2500,
      position : "bottom"
    });
    toast.present();
  }
}
