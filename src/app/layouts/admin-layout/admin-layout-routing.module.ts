import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from 'src/app/pages/checkout/checkout.component';
import { OrdersComponent } from 'src/app/pages/orders/orders.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ShoppingCartComponent } from 'src/app/pages/shopping-cart/shopping-cart.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { WhishlistComponent } from 'src/app/pages/whishlist/whishlist.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'whishlist', component: WhishlistComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'my-orders', component: OrdersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
