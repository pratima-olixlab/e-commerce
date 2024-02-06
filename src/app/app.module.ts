import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { MaterialComponentsModule } from './material-component.module';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeDialogComponent } from './home-dialog/home-dialog.component';
import { ProductComponent } from './product/product.component';
import { StartComponent } from './start/start.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './services/cart.service';
import { PriceFormatPipe } from './price-format.pipe';
import { HomeStartComponent } from './home-start/home-start.component';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import { AdminComponent } from './admin/admin.component';
// import { registerLocaleData } from '@angular/common';
// import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroModule } from './ng-zorro.module';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { MiniHeaderComponent } from './header/mini-header/mini-header.component';
import { AddressComponent } from './auth/address/address.component';
import { AddressHomeComponent } from './auth/address-home/address-home.component';
import { AddressAddsComponent } from './auth/address-adds/address-adds.component';
import { OrdersComponent } from './buy-product/orders/orders.component';
import { HeadersComponent } from './admin/components/header/headers.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AdminProductComponent } from './admin/components/admin-product/admin-product.component';
import { AdminSubCategoryComponent } from './admin/components/admin-subcategory/admin-subcategory.component';
import { CategoryDetailsComponent } from './admin/components/admin-category/category-details/category-details.component';
import { CategoryProductComponent } from './admin/components/admin-category/category-main/category-product.component';
import { SubcategoryDetailsComponent } from './admin/components/admin-subcategory/subcategory-details/subcategory-details.component';
import { UsersComponent } from './admin/components/users/users.component';
import { UserAddComponent } from './admin/components/users/user-add/user-add.component';
import { ProductOrdersComponent } from './admin/components/product-orders/product-orders.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { MiniOrdersComponent } from './buy-product/orders/mini-orders/mini-orders.component';
import { OrdersAcceptedComponent } from './admin/components/product-orders/orders-accepted/orders-accepted.component';
import { OrdersDeclineComponent } from './admin/components/product-orders/orders-decline/orders-decline.component';
import { PaymentComponent } from './payment/payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { WishlistComponent } from './user-orders/wishlist/wishlist.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { NotificationComponent } from './notification/notification.component';
import { SimpleNotificationsModule } from 'angular2-notifications';

// registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    HomeComponent,
    HomeDialogComponent,
    ProductComponent,
    StartComponent,
    CartComponent,
    PriceFormatPipe,
    HomeStartComponent,
    HelpdeskComponent,
    AdminComponent,
    BuyProductComponent,
    MiniHeaderComponent,
    AddressComponent,
    AddressHomeComponent,
    AddressAddsComponent,
    OrdersComponent,
    HeadersComponent,
    AdminProductComponent,
    AdminSubCategoryComponent,
    CategoryDetailsComponent,
    CategoryProductComponent,
    SubcategoryDetailsComponent,
    UsersComponent,
    UserAddComponent,
    ProductOrdersComponent,
    EditProfileComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    UserOrdersComponent,
    MiniOrdersComponent,
    OrdersDeclineComponent,
    OrdersAcceptedComponent,
    PaymentComponent,
    ProductDetailsComponent,
    WishlistComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MaterialComponentsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgZorroModule,
    AdminRoutingModule,
    NgxStripeModule.forRoot("pk_test_51OQMS8SBmrKIRoJWhVgg6myQKYC6OSEFOCcVQLT3TMBs7LWV30GvB9MZkKYAKBOzdnLQQTta3ZlQYTIcrJmfqNbs00NlzjPYwh"),
    NgxImageZoomModule,
    AngularFireMessagingModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}