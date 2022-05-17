import { TokenService } from '../core/services/token.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


export class hotelData {
  constructor(
    public hotelName: string,
    public area: string,
    public rating: string,
    public hotelUrl: string
  ) { }
}

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})




export class HotelComponent implements OnInit {

  hoteldata!: hotelData[];
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.getHotelData()
  }

  hotelName(hotelName: any) {
    localStorage.setItem("hotelName", "" + hotelName)
    console.log(hotelName)
    this.router.navigate(['menu'])
  }

  getHotelData() {
    const category = localStorage.getItem("category")
    this.http.get<any>('http://localhost:9000/hotelData/' + category).subscribe(
      response => {
        console.log(response);
        this.hoteldata = response;
      }
    );
  }

  logoutUser() {
    localStorage.clear()
    this.router.navigate([''])
  }

}
