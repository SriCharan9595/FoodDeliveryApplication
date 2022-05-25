import { RegularService } from '../../../core/services/regular.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token.service'; 


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router,
    private regularService: RegularService
    ) { }

  category(category:any) {
    localStorage.setItem("category",""+category)
    console.log(category)
    this.router.navigate(['hotel'])
  }

  logout(){
    this.regularService.logoutUser()
  }

  ngOnInit(): void {
  }

}
