import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminSubCategoryComponent } from './components/admin-subcategory/admin-subcategory.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { CategoryProductComponent } from './components/admin-category/category-main/category-product.component';
import { UsersComponent } from './components/users/users.component';
import { ProductOrdersComponent } from './components/product-orders/product-orders.component';

const routes: Routes = [
{
  path: 'admin',
  component: AdminComponent,
  children:[
    {
      path: "category",
      component: CategoryProductComponent
    },
    {
      path: "subcategory",
      component: AdminSubCategoryComponent
    },
    {
      path: "products",
      component: AdminProductComponent
    },
    {
      path:"users",
      component: UsersComponent
    },
    {
      path:"product-orders",
      component: ProductOrdersComponent
    },
    {
        path: "**",
        redirectTo: ""
      }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
