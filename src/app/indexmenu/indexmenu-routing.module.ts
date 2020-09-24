import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexmenuPage } from './indexmenu.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: IndexmenuPage,
    children:[
      {
        path:'home',
        children:[
          {
            path:'',
            loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path:'order',
        children:[
          {
            path:'',
            loadChildren: () => import('../order/order.module').then( m => m.OrderPageModule)
          }
        ]
      },
      {
        path:'profile',
        children:[
          {
            path:'',
            loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
          }
        ]
      },{
        path:'',
        redirectTo:'tabs/home',
        pathMatch:'full'
      }
    ]
  },
  {
    path:'',
    redirectTo:'tabs/home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexmenuPageRoutingModule {}
