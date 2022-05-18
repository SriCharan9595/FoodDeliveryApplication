import { RegularService } from './../core/services/regular.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor (
    private router: Router,
    private regularService: RegularService
    ) { }

  logout(){
    this.regularService.logoutUser()
  }

  ngOnInit(): void {
  }

}
