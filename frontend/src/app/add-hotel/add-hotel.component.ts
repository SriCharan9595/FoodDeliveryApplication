import { GlobalUrl } from './../global-url';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router
    ) { }

  Category = [
    {category:'Breakfast'},
    {category:'Lunch'},
    {category:'Snacks'},
    {category:'Beverages'},
    {category:'Dinner'},
    {category:'Fastfood'}
  ]

  selectedCategory !: string ;

  AddHotelData(data:any) {
    console.log(data)
    this.http.post(GlobalUrl.url+"/admin/addHotel",{category:data.category, hotelName:data.hotelName,
        area:data.area, rating:data.rating, hotelUrl:data.hotelUrl})
        .subscribe(
          (res:any)=>{
          console.log(res.message)
          this.router.navigate(['getHotel'])
        },(err)=>{
          console.log("Something went wrong")
        })
        
  }

  ngOnInit(): void {
  }

}
