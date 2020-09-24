import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SuccessPage } from './success.page';

import { SuccessPageRoutingModule } from './success-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessPageRoutingModule
  ],
  declarations:[SuccessPage]
})
export class SuccessPageModule {}
