import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormProfilePage } from './formprofile.page';

import { FormProfilePageRoutingModule } from './formprofile-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormProfilePageRoutingModule
  ],
  declarations: [FormProfilePage]
})
export class FormProfilePageModule {}
