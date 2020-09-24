import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SyaratPage } from './syarat.page';

import { SyaratPageRoutingModule } from './syarat-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SyaratPageRoutingModule
  ],
  declarations:[SyaratPage]
})
export class SyaratPageModule {}
