import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminHotelComponent } from './admin-hotel/admin-hotel.component';
import { AdminUserComponent } from './admin-user/admin-user.component';

const routes: Routes = [
{ path: 'admin', component: AdminHomeComponent, canActivate: [AdminGuard] },
{ path: 'getFoodies', component: AdminUserComponent, canActivate: [AdminGuard] },
{ path: 'getHotel', component: AdminHotelComponent, canActivate: [AdminGuard] },
{ path: 'addHotel', component: AddHotelComponent, canActivate: [AdminGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
