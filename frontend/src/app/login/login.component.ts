import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../core/services/token.service';

export class findFoodie {
  constructor(
    public id: number,
    public username: string,
    public phoneNo: string,
    public mailId: string
  ) { }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  findFoodie!: findFoodie[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
  ) { }

  UserData(data: any) {
    console.log(data)

    this.http.post("http://localhost:9000/login", { mailId: data.mailId, password: data.password })
      .subscribe(
        (res: any) => {

          this.http.get<any>('http://localhost:9000/findFoodie/' + data.mailId).subscribe(
            response => {
              localStorage.setItem("logFoodieID", "" + response.id)
              localStorage.setItem("username", "" + response.username)
              localStorage.setItem("phoneNo", "" + response.phoneNo)
              localStorage.setItem("mailId", "" + response.mailId)

              this.http.get<any>('http://localhost:9000/findAddress/' + localStorage.getItem('logFoodieID')).subscribe(
                response => {
                  console.log(response)
                  localStorage.setItem("doorNo", "" + response.doorNo)
                  localStorage.setItem("street", "" + response.street)
                  localStorage.setItem("area", "" + response.area)
                  localStorage.setItem("district", "" + response.district)
                  localStorage.setItem("pincode", "" + response.pincode)
                }
              );
              
            }
          );

          localStorage.setItem("Role", "USER")
          this.tokenService.saveAuthToken(res.accessToken)
          this.router.navigate(['category'])

        },

        (err) => {
          console.log("wrong credentials")
        }

      )
  }

  AdminData(data: any) {
    console.log(data)
    this.http.post("http://localhost:9000/admin/login", { mailId: data.mailId, password: data.password })
      .subscribe(
        (res: any) => {
          localStorage.setItem("Role", "ADMIN")
          this.tokenService.saveAuthToken(res.accessToken)
          this.router.navigate(['admin'])
        },
        (err) => {
          console.log("wrong credentials")
        })
  }

  ngOnInit(): void {
  }

}
