import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormProfilePage } from './formprofile.page';

const routes: Routes = [
  {
    path: '',
    component: FormProfilePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormProfilePageRoutingModule {}
