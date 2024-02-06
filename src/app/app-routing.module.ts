import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { HomeStartComponent } from './home-start/home-start.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { AddressComponent } from './auth/address/address.component';
import { AddressHomeComponent } from './auth/address-home/address-home.component';
import { AddressAddsComponent } from './auth/address-adds/address-adds.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CategoryDetailsComponent } from './admin/components/admin-category/category-details/category-details.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './admin/auth.guard';
import { OrdersComponent } from './buy-product/orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { MiniOrdersComponent } from './buy-product/orders/mini-orders/mini-orders.component';
import { OrdersAcceptedComponent } from './admin/components/product-orders/orders-accepted/orders-accepted.component';
import { OrdersDeclineComponent } from './admin/components/product-orders/orders-decline/orders-decline.component';
import { PaymentComponent } from './payment/payment.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { WishlistComponent } from './user-orders/wishlist/wishlist.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: HomeStartComponent,
  },
  { 
    path: 'product-details/:id', 
    component: ProductDetailsComponent },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'header',
    component: HeaderComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'buy',
    component: BuyProductComponent,
  },
  {
    path: 'address',
    component: AddressComponent,
  },
  {
    path: 'address-adds',
    component: AddressAddsComponent,
  },
  {
    path: 'address-home',
    component: AddressHomeComponent,
  },
  {
    path: 'card-details',
    component: CardDetailsComponent,
  },
  {
    path: 'category-details',
    component: CategoryDetailsComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'user-orders',
    component: UserOrdersComponent,
  },
  {
    path: 'mini-orders',
    component: MiniOrdersComponent,
  },
  {
    path: 'app-orders-decline',
    component: OrdersDeclineComponent,
  },
  {
    path: 'app-orders-accepted',
    component: OrdersAcceptedComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
