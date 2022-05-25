import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})

export class NotifyService {

  constructor(private toastr: ToastrService) { }
  
  userLoginSuccess() {
    this.toastr.success("User Logged in Successfully")
  }

  adminLoginSuccess() {
    this.toastr.success("Admin Logged in Successfully")
  }

  invalidCredentials() {
    this.toastr.error("Invalid email or password")
  }

  orderPlaced() {
    this.toastr.success("Your Order is Placed Successfully")
  }

  addressReplace() {
    this.toastr.success("Your Address is replaced Successfully")
  }

  logout() {
    this.toastr.success("Logged Out Successfully")
  }



}  