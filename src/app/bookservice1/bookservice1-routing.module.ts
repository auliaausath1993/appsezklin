import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Bookservice1Page } from './bookservice1.page';

const routes: Routes = [
  {
    path: '',
    component: Bookservice1Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Bookservice1PageRoutingModule {}
