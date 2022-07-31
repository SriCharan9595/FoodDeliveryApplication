import { NotifyService } from '../../../core/services/notify.service';
import { GlobalUrl } from '../../../url/global-url';
import { RegularService } from '../../../core/services/regular.service';
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
    private regularService: RegularService,
    private notify: NotifyService
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

  paymentHandler:any = null;


  AddressData(data: any) {
    console.log(data)

    this.http.post(GlobalUrl.url+"/updateAddress", { foodieID: localStorage.getItem('logFoodieID'), doorNo: data.doorNo, street: data.street, area: data.area, district: data.district, pincode: data.pincode })
      .subscribe(
        (res: any) => {
          this.notify.addressReplace()
          console.log(res.message)
          // this.router.navigate(['login'])
        }, (err) => {
          console.log("Something went wrong")
        })

        
  }

  initializePayment(finalBill: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51L35GdSIsWsinmVaJqSdULYwkfCUtqwZpMXKoYF7JUTqduLpwqjIeSvPfP0R1vvw5PhLsu9ZuyUrcN2x4PRvYiMu00HXtonpUb',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({stripeToken})
        foodieOrder();
      }
    });


    const foodieOrder = ()=>{
      this.http.get<any>(GlobalUrl.url+'/findAddress/' + localStorage.getItem('logFoodieID')).subscribe(
        res => {
          localStorage.setItem("foodieAddress", "" + res.doorNo + ",  " + res.street + "," + res.area + "," +
            res.district + "," + res.pincode)
          this.notify.addressReplace()
          this.http.post(GlobalUrl.url+"/orders", {
  
            foodieID: localStorage.getItem('logFoodieID'),
            foodieDetails: localStorage.getItem('foodieDetails'),
            foodieAddress: localStorage.getItem('foodieAddress'),
            menuDetails: localStorage.getItem('cartItem'),
            finalBill: localStorage.getItem('finalBill')
  
          }).subscribe(
            (res: any) => {
              console.log(res.message)
              this.notify.orderPlaced()
              this.router.navigate(['category'])
            },
            (err) => {
              console.log("Something went wrong")
            })
  
        }
      )
    }
  

  
    paymentHandler.open({
      name: 'FoodiezSpot',
      description: 'Why Starve When You Have Us',
      amount: finalBill * 100,
      currency: "inr"
    });
  }
  
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51L35GdSIsWsinmVaJqSdULYwkfCUtqwZpMXKoYF7JUTqduLpwqjIeSvPfP0R1vvw5PhLsu9ZuyUrcN2x4PRvYiMu00HXtonpUb',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }


  
  proceedToPay() {
    this.initializePayment(parseInt(""+this.finalBill))
  }

  logout() {
    this.regularService.logoutUser()
  }

  ngOnInit(): void {
    this.load()
    this.invokeStripe();

  }

  // subload() {
  //   window.location.reload()
  // }

  load() {
    const totalPrice = localStorage.getItem('totalPrice')
    const bill = parseInt("" + totalPrice) + 50
    localStorage.setItem("finalBill", "" + bill)
  }
}
