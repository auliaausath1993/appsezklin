import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Bookservice1Page } from './bookservice1.page';

import { Bookservice1PageRoutingModule } from './bookservice1-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Bookservice1PageRoutingModule
  ],
  declarations:[Bookservice1Page]
})
export class Bookservice1PageModule {}
