import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate : [AuthGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  { 
    path: 'login', 
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./bookservice/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'modal2',
    loadChildren: () => import('./bookservice1/modal2/modal2.module').then( m => m.Modal2PageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'verification1',
    loadChildren: () => import('./verification1/verification1.module').then( m => m.Verification1PageModule)
  },
  { 
    path: 'register', 
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  { 
    path: 'success', 
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },
  { 
    path: 'syarat', 
    loadChildren: () => import('./syarat/syarat.module').then( m => m.SyaratPageModule)
  },
  { 
    path: 'bookservice', 
    loadChildren: () => import('./bookservice/bookservice.module').then( m => m.BookservicePageModule)
  },
  { 
    path: 'bookservice1', 
    loadChildren: () => import('./bookservice1/bookservice1.module').then( m => m.Bookservice1PageModule)
  },
  { 
    path: 'indexmenu', 
    loadChildren: () => import('./indexmenu/indexmenu.module').then( m => m.IndexmenuPageModule)
  },
  { 
    path: 'profile', 
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  { 
    path: 'formprofile', 
    loadChildren: () => import('./profile/form-profile/formprofile.module').then( m => m.FormProfilePageModule)
  },
  { 
    path: 'order', 
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule)
  },
  { 
    path: 'detailorder', 
    loadChildren: () => import('./detailorder/detailorder.module').then( m => m.DetailorderPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
