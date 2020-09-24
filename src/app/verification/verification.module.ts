import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerificationPage } from './verification.page';

import { VerificationPageRoutingModule } from './verification-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations:[VerificationPage]
})
export class VerificationPageModule {}
