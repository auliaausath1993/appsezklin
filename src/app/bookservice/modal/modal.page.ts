import { Component,NgZone,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
declare var google:any;
@Component({
    selector: 'app-modal',
    templateUrl: 'modal.page.html',
    styleUrls: ['modal.page.scss'],
})
export class ModalPage {
    private geoAutoComplate = new google.maps.places.AutocompleteService();
    public geoSearchResult = new Array<any>();
    FormOrder: FormGroup;
    constructor(
      public modalController: ModalController,
      public geo:Geolocation,
      public ngZone:NgZone,
      private formBuilder:FormBuilder,
    ) {

    }

    searchlocation: string = '';
    public alamat2;
    ishidden="";
    lat;
    lng;

    ngOnInit() {
      this.FormOrder=this.formBuilder.group({
        alamat2 : [this.alamat2, Validators.required]
      })
    }

  gmaps(ev:any){
    this.searchlocation = ev.target.value;
    if(this.searchlocation===""||this.searchlocation===undefined){
      this.ishidden="";
      this.lat="";
      this.lng="";
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

  closeSearch(){
    this.alamat2="";
    this.ishidden="";
    console.log("wkwk");
  }

  checkedLocation(param){
    this.alamat2=param;
    this.ishidden="";
    this.geoCode(param);
  }

  geoCode(param){
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address':param},(results,status)=>{
      this.lat = results[0].geometry.location.lat();
      this.lng = results[0].geometry.location.lng();
      const onClosedData={
        'latitude':this.lat,
        'longitude':this.lng,
        'alamat':param
      };
      this.modalController.dismiss(onClosedData);
    });
  }

  goBack(){
    const onClosedData={
    };
    this.modalController.dismiss(onClosedData);
  }

}