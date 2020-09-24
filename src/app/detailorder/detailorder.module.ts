import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DetailorderPage } from './detailorder.page';

import { DetailorderPageRoutingModule } from './detailorder-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailorderPageRoutingModule
  ],
  declarations: [DetailorderPage]
})
export class DetailorderPageModule {}
