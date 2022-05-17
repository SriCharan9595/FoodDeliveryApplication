import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit { 

  constructor(
    private http:HttpClient,
    private router:Router
    ) { }

  RegisterData(data:any) {
    console.log(data)
    this.http.post("http://localhost:9000/register",{username:data.username,phoneNo:data.phoneNo,mailId:data.mailId,password:data.password1})
        .subscribe(
          (res:any)=>{

            this.http.get<any>('http://localhost:9000/findFoodie/' + data.mailId).subscribe(
              response => {
                localStorage.setItem("regFoodieID",""+response.id)
              }
            );
            
            console.log(res.message)
            this.router.navigate(['address'])
        },(err)=>{
            console.log(err)
            console.log("Something went wrong")
        })
        
  }

  ngOnInit(): void {
  }

}

