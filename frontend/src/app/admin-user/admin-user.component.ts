import { GlobalUrl } from './../global-url';
import { RegularService } from './../core/services/regular.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../core/services/token.service'

export class foodieData {
  constructor(
    public id: number,
    public username: string,
    public phoneNo: string,
    public mailId: string,
  ) { }
}

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})

export class AdminUserComponent implements OnInit {

  foodieData!: foodieData[];
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private regularService:RegularService,
    private globalUrl: GlobalUrl
  ) { }

  ngOnInit(): void {
    this.getFoodieData()
  }

  deleteFoodie(id: any) {
    this.httpClient.get<any>(this.globalUrl+"/admin/deleteFoodie/" + id)
      .subscribe(
        res => {
          if (res.status === 200) {
            prompt('Success')
            console.log('Foodie removed successfully' + res);
          }
        })
  }

  getFoodieData() {
    this.httpClient.get<any>(this.globalUrl+"/admin/getFoodies")
      .subscribe(
        response => {
          console.log(response);
          this.foodieData = response;
        });
  }

  logout(){
    this.regularService.logoutUser()
  }

}

