import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from './../servive/service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Platform,ModalController,NavController,LoadingController,ToastController} from '@ionic/angular';
import * as moment from 'moment';
import { ModalPage } from './modal/modal.page';
@Component({
  selector: 'app-bookservice',
  templateUrl: 'bookservice.page.html',
  styleUrls: ['bookservice.page.scss'],
})
export class BookservicePage {
  private currentNumberText = '1 Jam';
  currentNumber:any;
  FormOrder: FormGroup;
  partner:any;
  type:any;
  dataform:any;
  id:any;
  set_data:any;
  lat;
  lng;
  alamat;
  id_layanan;
  date_now = moment().format('YYYY-MM-DD');
  loc="";
  constructor(
    private nav:NavController,
    private router: Router,
    private formBuilder:FormBuilder,
    private serviceService : ServiceService,
    public route: ActivatedRoute,
    public loadingController : LoadingController,
    public toastController : ToastController,
    public modalController: ModalController
  ) {}
  ngOnInit() {
    this.partner= this.router.getCurrentNavigation().extras.state.partner;
    this.type= this.router.getCurrentNavigation().extras.state.type;
    this.FormOrder=this.formBuilder.group({
      id : ['',Validators.required],
      partner : [this.partner,Validators.required],
      type : [this.type,Validators.required],
      tanggal : ['', Validators.required],
      jam : ['', Validators.required],
      qty : [this.currentNumber,Validators.required],
      alamat : [this.alamat, Validators.required],
      layanan:[this.id_layanan, Validators.required],
      lat:[''],
      lng:[''],
      note : ['']
    })
  }
  ionViewWillEnter() {
    this.serviceService.CekUser().subscribe(data=>{
      this.set_data = data;
      this.id = this.set_data.data.customer_id;
      this.currentNumber=1;
      if(this.id===undefined||this.id===null||this.id===''){
        this.serviceService.logout();
      }
      this.getlayanan();
      this.setHarga();
    });
  }

  onDescrement() {
    if(this.currentNumber > 1){
      this.currentNumber--;
      this.currentNumberText = this.currentNumber+' Jam';
      this.setHargaEx(this.currentNumber);
    }
  }

  onIncrement() {
    if(this.currentNumber < 6){
      this.currentNumber++;
      this.currentNumberText = this.currentNumber+' Jam';
      this.setHargaEx(this.currentNumber);
    }else{
      let message='Maksimum 6 Jam';
      this.presentToast(message)
    }
  }

  net_amt;
  setHargaEx(qty){
    let par = this.FormOrder.value;
    if(par.layanan!==null){
      let set = par.layanan.split("#");
      let harga = set[1];
      this.net_amt = harga*qty;
    }else{
      this.net_amt = 0;
    }
  }
  setHarga(){
    let par = this.FormOrder.value;
    if(par.layanan!==null){
      let set = par.layanan.split("#");
      let harga = set[1];
      let qty = par.qty;
      this.net_amt = harga*qty;
    }else{
      this.net_amt = 0;
    }
  }

  datalayanan;
  setlayanan;
  async getlayanan(){
    const loading = await this.loadingController.create({
      message : 'Please wait...'
    });

    await loading.present();
    this.serviceService.getLayanan(this.FormOrder.value, 'layanan_service').subscribe(
      data => {
          loading.dismiss();
          this.datalayanan = data;
          this.setlayanan = this.datalayanan.data;
          console.log(this.setlayanan);
      },
      error => {
            let message='Tidak dapat memproses permintaan anda';
            console.log(message)
            this.presentToast(message);
            loading.dismiss();
        }
    );
  }

  async SaveFunc(){
    const loading = await this.loadingController.create({
      message : 'Please wait...'
    });

    await loading.present();
    this.serviceService.SaveBookService(this.FormOrder.value, 'save_bookservice').subscribe(
      data => {
          this.dataform = data;
          if(this.dataform.status !== 'success') {
              let message='Tidak dapat memproses permintaan anda';
              this.presentToast(message)
              loading.dismiss();
            }else{
              let message='Bookservice berhasil disimpan';
              this.presentToast(message)
              loading.dismiss();
              this.router.navigateByUrl('/indexmenu/tabs/order');
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

  parseParam;
  async showModal(){
    const modal: HTMLIonModalElement =
       await this.modalController.create({
          component: ModalPage
    });

    modal.onDidDismiss().then((detail) => {
      this.parseParam = detail.data;
      if (detail !== null) {
        this.lat= this.parseParam.latitude;
        this.lng= this.parseParam.longitude;
        this.alamat=this.parseParam.alamat;
        this.loc=this.parseParam.latitude;
      }
   });


    await modal.present();
  }

  goBooking(){
    this.router.navigateByUrl('success');
  }
}