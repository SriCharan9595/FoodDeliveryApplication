import { NotifyService } from '../../../core/services/notify.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';
import { GlobalUrl } from '../../../url/global-url';

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
    private notify: NotifyService
  ) { }

  isUser = true;

  openAdmin() {

    const adminForm = document.getElementById("admin-form") as HTMLDivElement
    const userForm = document.getElementById("user-form") as HTMLDivElement

    adminForm.style.display = "block"
    userForm.style.display = "none"

    this.isUser = false

  }

  openUser() {

    const adminForm = document.getElementById("admin-form") as HTMLDivElement
    const userForm = document.getElementById("user-form") as HTMLDivElement

    adminForm.style.display = "none"
    userForm.style.display = "block"
    
    this.isUser = true
    
  }

  UserData(data: any) {
    console.log(data)

    this.http.post(GlobalUrl.url+"/login", { mailId: data.mailId, password: data.password })
      .subscribe(
        (res: any) => {

          this.http.get<any>(GlobalUrl.url+'/findFoodie/' + data.mailId).subscribe(
            response => {
              localStorage.setItem("logFoodieID", "" + response.id)
              localStorage.setItem("username", "" + response.username)
              localStorage.setItem("phoneNo", "" + response.phoneNo)
              localStorage.setItem("mailId", "" + response.mailId)
              localStorage.setItem("foodieDetails",""+response.username+","+response.phoneNo)

              this.http.get<any>(GlobalUrl.url+'/findAddress/' + localStorage.getItem('logFoodieID')).subscribe(
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
          this.notify.userLoginSuccess()
          this.tokenService.saveAuthToken(res.authToken)
          this.tokenService.saveRefreshToken(res.refreshToken)
          this.router.navigate(['category'])

        },

        (err) => {
          this.notify.invalidCredentials()
        }

      )
  }

  AdminData(data: any) {
    console.log(data)
    this.http.post(GlobalUrl.url+"/admin/login", { mailId: data.mailId, password: data.password })
      .subscribe(
        (res: any) => {
          localStorage.setItem("Role", "ADMIN")
          this.notify.adminLoginSuccess()
          this.tokenService.saveAuthToken(res.authToken)
          this.tokenService.saveRefreshToken(res.refreshToken)
          this.router.navigate(['admin'])
        },
        (err) => {
          this.notify.invalidCredentials()
        })
  }

  ngOnInit(): void {
  }

}
