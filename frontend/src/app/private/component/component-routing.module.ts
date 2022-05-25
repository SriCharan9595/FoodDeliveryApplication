import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/core/guards/user.guard';
import { BillingComponent } from './billing/billing.component';
import { CategoryComponent } from './category/category.component';
import { HotelComponent } from './hotel/hotel.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: 'category', component: CategoryComponent, canActivate: [UserGuard] },
  { path: 'hotel', component: HotelComponent, canActivate: [UserGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [UserGuard] },
  { path: 'getBill', component: BillingComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
