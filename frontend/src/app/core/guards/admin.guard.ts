import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GuardService } from '../services/guard.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private guard: GuardService, private router: Router) { }

  canActivate() {

    const Role = localStorage.getItem("Role");
    if(this.guard.IsLoggedIn() && Role == "ADMIN") {
      return true;
    }

    alert("You don't have admin rights")
    this.router.navigate(['login']);
    return false;
  } 

  
}
