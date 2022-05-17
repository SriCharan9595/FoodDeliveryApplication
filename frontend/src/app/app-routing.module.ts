import { UserGuard } from './core/guards/user.guard';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { MenuComponent } from './menu/menu.component';
import { HotelComponent } from './hotel/hotel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminHotelComponent } from './admin-hotel/admin-hotel.component';
import { AddressComponent } from './address/address.component';
import { AdminGuard } from './core/guards/admin.guard';
import { BillingComponent } from './billing/billing.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'address', component: AddressComponent },
  { path: 'login', component: LoginComponent },
  { path: 'category', component: CategoryComponent, canActivate: [UserGuard] },
  { path: 'hotel', component: HotelComponent, canActivate: [UserGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [UserGuard] },
  { path: 'getBill', component: BillingComponent, canActivate: [UserGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'getFoodies', component: AdminUserComponent, canActivate: [AdminGuard] },
  { path: 'getHotel', component: AdminHotelComponent, canActivate: [AdminGuard] },
  { path: 'addHotel', component: AddHotelComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
