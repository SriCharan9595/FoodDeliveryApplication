import { RegularService } from './../core/services/regular.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../core/services/token.service';
import { GlobalUrl } from '../global-url';

export class menuData {
  constructor(
    public id: number,
    public hotelName: string,
    public hotelMenu: string,
    public menuPrice: string,
  ) { }
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menudata!: menuData[];
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private regularService: RegularService,
    private globalUrl: GlobalUrl
  ) { }


  parsedObject = JSON.parse('[' + localStorage.getItem("cartItem") + ']');

  cart: any = this.parsedObject[0] != null ? this.parsedObject : []

  totalPrice: number = parseInt(localStorage.getItem("totalPrice") || "0");

  addFood(foodData: any) {

    this.cart.push(foodData)
    console.log(foodData)
    console.log(this.totalPrice)

    if (localStorage.getItem("cartItem") == null) {
      localStorage.setItem("cartItem", `{"dishName":"${foodData.dish}","dishPrice":"${foodData.price}"}`)
      this.totalPrice += parseInt(foodData.price)
      localStorage.setItem("totalPrice", "" + this.totalPrice)
    }
    else {
      localStorage.setItem("cartItem", localStorage.getItem("cartItem") + "," + `{"dishName":"${foodData.dish}","dishPrice":"${foodData.price}"}`)
      this.totalPrice += parseInt(foodData.price)
      localStorage.setItem("totalPrice", "" + this.totalPrice)
    }
    
  }


  removeDish(dishIndex: any) {

    let allObject = JSON.parse('[' + localStorage.getItem("cartItem") + ']');//[{}]
    console.log(allObject)

    allObject.splice(dishIndex, 1);

    localStorage.removeItem("cartItem");

    const removedDish = this.cart.splice(dishIndex, 1);

    // console.log(removedDish[0])

    allObject.forEach((element: any) => {
      console.log(element)
      if (localStorage.getItem("cartItem") == null) {
        localStorage.setItem("cartItem", `{"dishName":"${element.dish}","dishPrice":"${element.price}"}`)
      } 
      
      else {
        localStorage.setItem("cartItem", localStorage.getItem("cartItem") + "," + `{"dishName":"${element.dish}","dishPrice":"${element.price}"}`)
      }

    });

    this.totalPrice -= parseInt(removedDish[0].price)

    localStorage.setItem("totalPrice", "" + this.totalPrice)

  }


  ngOnInit(): void {
    this.getMenuData()
  }

  getMenuData() {
    const category = localStorage.getItem("category")
    const hotelName = localStorage.getItem("hotelName")
    this.httpClient.get<any>(this.globalUrl+"/search/" + category + "/" + hotelName).subscribe(
      response => {
        console.log(response);
        this.menudata = response;
      });
  }

  logout() {
    this.regularService.logoutUser()
  }

}
