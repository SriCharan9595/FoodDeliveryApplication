import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  totalPrice = localStorage.getItem('totalPrice')
  username = localStorage.getItem('username')
  phoneNo = localStorage.getItem('phoneNo')



  AddressData(data: any) {

  }


  logoutUser() {
    localStorage.clear()
    this.router.navigate([''])
  }

  ngOnInit(): void {
  }

}
