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
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getHotelData()
  }

  deleteHotel(id: any) {
    this.httpClient.get<any>("http://localhost:9000/admin/deleteHotel/" + id)
      .subscribe(
        res => {
          if (res.status === 200) {
            prompt('Success')
            console.log('Hotel removed successfully' + res);
          }
        })
  }

  getHotelData() {
    this.httpClient.get<any>("http://localhost:9000/admin/getHotel")
      .subscribe(
        response => {
          console.log(response);
          this.hotelData = response;
        }
      );
  }

  logoutUser() {
    localStorage.clear()
    this.router.navigate([''])
  }

}

