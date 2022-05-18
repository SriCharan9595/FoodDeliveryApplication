import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegularService {

  logoutUser() {
    localStorage.clear()
    this.router.navigate([''])
  }

  constructor(
    private router:Router
  ) { }
}
