import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from './../servive/service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Platform,NavController,LoadingController,ToastController} from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: 'order.page.html',
  styleUrls: ['order.page.scss'],
})
export class OrderPage {
  list_data: string = "list-1";
  id:any;
  set_data:any;
  dataform:any;
  ParamQuery:any;
  orderPending:any;
  constructor(
    private nav:NavController,
    private router: Router,
    private formBuilder:FormBuilder,
    private serviceService : ServiceService,
    public route: ActivatedRoute,
    public loadingController : LoadingController,
    public toastController : ToastController,
  ) {}

  ionViewWillEnter() {
    this.serviceService.CekUser().subscribe(data=>{
      this.set_data = data;
      this.id = this.set_data.data.customer_id;
      if(this.id===undefined||this.id===null||this.id===''){
        this.serviceService.logout();
      }
      this.OrderPending(this.id,'Pending');
    });
  }

  async OrderPending(id,status){
    const loading = await this.loadingController.create({
      message : 'Please wait...'
    });

    await loading.present();
    this.ParamQuery = {
      'status':status,
      'id':id
    };
    this.serviceService.getOrder(this.ParamQuery, 'order_pending').subscribe(
      data => {
          this.dataform = data;
          if(this.dataform.status !== 'success') {
              loading.dismiss();
            }else{
              loading.dismiss();
              this.orderPending = this.dataform.data;
            }
      },
      error => {
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
}
