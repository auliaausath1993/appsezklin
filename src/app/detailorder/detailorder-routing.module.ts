import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailorderPage } from './detailorder.page';

const routes: Routes = [
  {
    path: '',
    component: DetailorderPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailorderPageRoutingModule {}
