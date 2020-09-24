import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Verification1Page } from './verification1.page';

const routes: Routes = [
  {
    path: '',
    component: Verification1Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Verification1PageRoutingModule {}
