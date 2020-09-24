import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Verification1Page } from './verification1.page';

import { Verification1PageRoutingModule } from './verification1-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Verification1PageRoutingModule
  ],
  declarations:[Verification1Page]
})
export class Verification1PageModule {}
