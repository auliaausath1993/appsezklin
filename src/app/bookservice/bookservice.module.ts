import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BookservicePage } from './bookservice.page';

import { BookservicePageRoutingModule } from './bookservice-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BookservicePageRoutingModule
  ],
  declarations:[BookservicePage]
})
export class BookservicePageModule {}
