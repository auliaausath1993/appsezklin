import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ModalPage } from './modal.page';

import { ModalPageRoutingModule } from './modal-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ModalPageRoutingModule
  ],
  declarations:[ModalPage]
})
export class ModalPageModule {}