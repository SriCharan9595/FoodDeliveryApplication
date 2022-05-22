import { GlobalUrl } from './../global-url';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router,
    private globalUrl: GlobalUrl
    ) { }

  AddressData(data:any) {
    console.log(data)
    const foodieID = localStorage.getItem("regFoodieID")
    this.http.post(this.globalUrl+"/addAddress",{foodieID:foodieID,doorNo:data.doorNo,street:data.street,area:data.area,district:data.district,pincode:data.pincode})
        .subscribe(
          (res:any)=>{
          alert("Your address added successfully")
          console.log(res.message)
          this.router.navigate(['login'])
        },(err)=>{
          console.log("Something went wrong")
        })    
  }

  ngOnInit(): void {
  }

}
