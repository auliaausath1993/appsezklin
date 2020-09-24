import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from './../servive/service.service';
import { Platform,NavController,LoadingController,ToastController} from '@ionic/angular';

@Component({
  selector: 'app-detailorder',
  templateUrl: 'detailorder.page.html',
  styleUrls: ['detailorder.page.scss'],
})
export class DetailorderPage {

  order_id;
  id:any;
  set_data:any;
  ParamQuery:any;
  dataform:any;

  nama;
  service_type;
  date_order;
  date_finish;
  alamat;
  status;
  photo;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private serviceService : ServiceService,
    public loadingController : LoadingController,
  ) {}
  ngOnInit() {
    this.order_id= this.router.getCurrentNavigation().extras.state.order_id;
  }
  ionViewWillEnter() {
    this.serviceService.CekUser().subscribe(data=>{
      this.set_data = data;
      this.id = this.set_data.data.customer_id;
      if(this.id===undefined||this.id===null||this.id===''){
        this.serviceService.logout();
      }
      this.setDetail(this.order_id);
    });
  }

  set;
  async setDetail(id){
    const loading = await this.loadingController.create({
      message : 'Please wait...'
    });

    await loading.present();
    this.ParamQuery = {
      'order_id':id
    };
    this.serviceService.getOrder(this.ParamQuery, 'order_detail').subscribe(
      data => {
          this.dataform = data;
          if(this.dataform.status !== 'success') {
            loading.dismiss();
          }else{
            loading.dismiss();
            this.set = this.dataform.data;
            this.nama = this.set.nama;
            this.service_type = this.set.service_type;
            this.alamat = this.set.alamat;
            this.date_order = this.set.date_order;
            this.status = this.set.status;
            this.photo= "../../assets/images/"+this.set.photo;
          }
      },
      error => {
          loading.dismiss();
        }
    );
  }
}
