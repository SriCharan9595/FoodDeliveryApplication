import { GlobalUrl } from './../global-url';
import { RegularService } from './../core/services/regular.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../core/services/token.service';
import { NgForm } from '@angular/forms';

export class hotelData {
  constructor(
    public id: number,
    public category: string,
    public hotelName: string,
    public area: string,
  ) { }
}

@Component({
  selector: 'app-admin-hotel',
  templateUrl: './admin-hotel.component.html',
  styleUrls: ['./admin-hotel.component.css']
})
export class AdminHotelComponent implements OnInit {

  hotelData!: hotelData[];
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private regularService: RegularService,
    private globalUrl: GlobalUrl
  ) { }

  ngOnInit(): void {
    this.getHotelData()
  }

  deleteHotel(id: any) {
    this.httpClient.get<any>(this.globalUrl+"/admin/deleteHotel/" + id)
      .subscribe(
        res => {
          if (res.status === 200) {
            prompt('Success')
            console.log('Hotel removed successfully' + res);
          }
        })
  }

  getHotelData() {
    this.httpClient.get<any>(this.globalUrl+"/admin/getHotel")
      .subscribe(
        response => {
          console.log(response);
          this.hotelData = response;
        }
      );
  }

  logout(){
    this.regularService.logoutUser()
  }

}


