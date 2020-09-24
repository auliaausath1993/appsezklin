import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Modal2Page } from './modal2.page';

import { Modal2PageRoutingModule } from './modal2-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Modal2PageRoutingModule
  ],
  declarations:[Modal2Page]
})
export class Modal2PageModule {}