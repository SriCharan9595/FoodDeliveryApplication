import { GuardService } from '../services/guard.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {

  constructor(private guard: GuardService, private router: Router) { }

  canActivate() {

    const Role = localStorage.getItem("Role");
    if(this.guard.IsLoggedIn() && Role == "USER") {
      return true;
    }
    
    alert("You have not logged in")
    this.router.navigate(['login']);
    return false;
  } 

}
