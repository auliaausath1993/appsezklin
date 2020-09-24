import { Component,NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from './../servive/service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { Platform,NavController,ModalController,LoadingController,ToastController} from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import * as moment from 'moment';
import { Modal2Page } from './modal2/modal2.page';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
declare var google:any;
@Component({
  selector: 'app-bookservice1',
  templateUrl: 'bookservice1.page.html',
  styleUrls: ['bookservice1.page.scss'],
})
export class Bookservice1Page {
  map: GoogleMap;
  private currentNumberText = '1 Kg';
  currentNumber:any;
  FormOrder: FormGroup;
  partner:any;
  type:any;
  dataform:any;
  id:any;
  set_data:any;
  lat;
  lng;
  searchlocation = "";
  alamat;
  ishidden="";
  id_layanan;
  date_now = moment().format('YYYY-MM-DD');
  loc="";
  private geoAutoComplate = new google.maps.places.AutocompleteService();
  public geoSearchResult = new Array<any>();
  constructor(
    private nav:NavController,
    private router: Router,
    private formBuilder:FormBuilder,
    private serviceService : ServiceService,
    public route: ActivatedRoute,
    public loadingController : LoadingController,
    public toastController : ToastController,
    public geo:Geolocation,
    public ngZone:NgZone,
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
      this.layanan();
      this.setHarga();
    });
  }

  onDescrement() {
    if(this.currentNumber > 1){
      this.currentNumber--;
      this.currentNumberText = this.currentNumber+' Kg';
      this.setHargaEx(this.currentNumber);
    }

  }

  onIncrement() {
    this.currentNumber++;
    this.currentNumberText = this.currentNumber+' Kg';
    this.setHargaEx(this.currentNumber);
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

  showMaps(){
    this.searchlocation = this.alamat;
    if(this.searchlocation===""||this.searchlocation===undefined){
      this.ishidden="";
      return;
    }
    this.geoAutoComplate.getPlacePredictions({
      input:this.searchlocation,
      componentRestrictions:{
        country:'ID'
      }
    },predictions=>{
      this.ngZone.run(()=>{
        this.ishidden=this.searchlocation;
        this.geoSearchResult = predictions;
      })
    });
  }

  datalayanan;
  setlayanan;
  async layanan(){
    const loading = await this.loadingController.create({
      message : 'Please wait...'
    });

    await loading.present();
    this.serviceService.getLayanan(this.FormOrder.value, 'layanan_laundry').subscribe(
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

  closeSearch(){
    this.alamat="";
    this.ishidden="";
    console.log("wkwk");
  }

  checkedLocation(param){
    this.alamat=param;
    this.ishidden="";
    this.geoCode(param);
  }

  geoCode(param){
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address':param},(results,status)=>{
      this.lat = results[0].geometry.location.lat();
      this.lng = results[0].geometry.location.lng();
    });
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

  goDetail(order_id){
    let navigationExtras : NavigationExtras = {
      state : {
        order_id:order_id
      }
    }
    this.nav.navigateForward('detailorder',navigationExtras);
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
          component: Modal2Page
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