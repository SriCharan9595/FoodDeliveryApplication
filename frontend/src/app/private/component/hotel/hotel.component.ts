import { GlobalUrl } from '../../../url/global-url';
import { RegularService } from '../../../core/services/regular.service';
import { TokenService } from '../../../core/services/token.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


export class hotelData {
  constructor(
    public category: string,
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
    private regularService: RegularService
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
    this.http.get<any>(GlobalUrl.url+'/hotelData/' + category).subscribe(
      response => {
        console.log(response);
        this.hoteldata = response;
      }
    );
  }

  logout(){
    this.regularService.logoutUser()
  }
}
