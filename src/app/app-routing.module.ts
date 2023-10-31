import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';

import { authGuard } from './auth.guard';
import { UserAuthComponent } from './user-auth/user-auth.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'seller-auth',
    component:SellerAuthComponent,
  },
  {
    path: 'seller-home',
    component:SellerHomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'seller-add-product',
    component : SellerAddProductComponent,
    canActivate : [authGuard]
  },
  {
    path: 'seller-update-product/:id',
    component : SellerUpdateProductComponent,
    canActivate : [authGuard]
  },{
    component:ProductDetailsComponent,
    path:'details/:productId'
  },
  {
    component: SearchComponent,
    path:'search/:query'
  },
  {
    path:'user-auth',
    component: UserAuthComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
