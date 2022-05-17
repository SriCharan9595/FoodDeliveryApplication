import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../core/services/token.service'; 


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router,
    private tokenService: TokenService
    ) { }

  category(category:any) {
    localStorage.setItem("category",""+category)
    console.log(category)
    this.router.navigate(['hotel'])
  }

  logoutUser() {
    localStorage.clear()
    this.router.navigate([''])
  }

  ngOnInit(): void {
  }

}
