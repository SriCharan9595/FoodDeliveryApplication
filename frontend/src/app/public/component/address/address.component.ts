import { GlobalUrl } from '../../../url/global-url';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotifyService } from 'src/app/core/services/notify.service';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router,
    private notify: NotifyService
    ) { }

  AddressData(data:any) {
    console.log(data)
    const foodieID = localStorage.getItem("regFoodieID")
    this.http.post(GlobalUrl.url+"/addAddress",{foodieID:foodieID,doorNo:data.doorNo,street:data.street,area:data.area,district:data.district,pincode:data.pincode})
        .subscribe(
          (res:any)=>{
          this.notify.addressAdded()
          console.log(res.message)
          this.router.navigate(['login'])
        },(err)=>{
          this.notify.addressError()
          console.log("Something went wrong")
        })    
  }

  ngOnInit(): void {
  }

}
