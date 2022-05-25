import { JwtAuthInterceptor } from './core/interceptors/jwt-auth.interceptor';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './public/component/home/home.component';
import { RegisterComponent } from './public/component/register/register.component';
import { LoginComponent } from './public/component/login/login.component';
import { AddressComponent } from './public/component/address/address.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CategoryComponent } from './private/component/category/category.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HotelComponent } from './private/component/hotel/hotel.component';
import { MenuComponent } from './private/component/menu/menu.component';
import { AdminHomeComponent } from './admin/component/admin-home/admin-home.component';
import { AdminUserComponent } from './admin/component/admin-user/admin-user.component';
import { AdminHotelComponent } from './admin/component/admin-hotel/admin-hotel.component';
import { TokenService } from './core/services/token.service';
import { AddHotelComponent } from './admin/component/add-hotel/add-hotel.component';
import { BillingComponent } from './private/component/billing/billing.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AddressComponent,
    HomeComponent,
    HotelComponent,
    CategoryComponent,
    MenuComponent,
    AdminHomeComponent,
    AdminUserComponent,
    AdminHotelComponent,
    AddHotelComponent,
    BillingComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtAuthInterceptor,
    multi:true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
