import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IndexmenuPage } from './indexmenu.page';

import { IndexmenuPageRoutingModule } from './indexmenu-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexmenuPageRoutingModule
  ],
  declarations:[IndexmenuPage]
})
export class IndexmenuPageModule {}
