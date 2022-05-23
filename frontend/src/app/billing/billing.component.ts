import { GlobalUrl } from './../global-url';
import { RegularService } from './../core/services/regular.service';
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
    private router: Router,
    private regularService: RegularService
  ) { }


  totalPrice = localStorage.getItem('totalPrice')
  username = localStorage.getItem('username')
  phoneNo = localStorage.getItem('phoneNo')

  doorNo = localStorage.getItem('doorNo')
  street = localStorage.getItem('street')
  area = localStorage.getItem('area')
  district = localStorage.getItem('district')
  pincode = localStorage.getItem('pincode')

  finalBill = localStorage.getItem('finalBill')


  AddressData(data: any) {
    console.log(data)

    this.http.post(GlobalUrl.url+"/updateAddress", { foodieID: localStorage.getItem('logFoodieID'), doorNo: data.doorNo, street: data.street, area: data.area, district: data.district, pincode: data.pincode })
      .subscribe(
        (res: any) => {
          alert("Your address replaced successfully")
          console.log(res.message)
          // this.router.navigate(['login'])
        }, (err) => {
          console.log("Something went wrong")
        })
  }


  foodieOrder() {

    this.http.get<any>(GlobalUrl.url+'/findAddress/' + localStorage.getItem('logFoodieID')).subscribe(
      res => {
        localStorage.setItem("foodieAddress", "" + res.doorNo + ",  " + res.street + "," + res.area + "," +
          res.district + "," + res.pincode)

        this.http.post(GlobalUrl.url+"/orders", {

          foodieID: localStorage.getItem('logFoodieID'),
          foodieDetails: localStorage.getItem('foodieDetails'),
          foodieAddress: localStorage.getItem('foodieAddress'),
          menuDetails: localStorage.getItem('cartItem'),
          finalBill: localStorage.getItem('finalBill')

        }).subscribe(
          (res: any) => {
            console.log(res.message)
            alert("Your Order is Placed Succesfully")
          },
          (err) => {
            console.log("Something went wrong")
          })

      }
    )
  }


  logout() {
    this.regularService.logoutUser()
  }

  ngOnInit(): void {

    const totalPrice = localStorage.getItem('totalPrice')
    let finalBill = parseInt("" + totalPrice) + 50
    localStorage.setItem("finalBill", "" + finalBill)
    console.log(finalBill)

  }

}
