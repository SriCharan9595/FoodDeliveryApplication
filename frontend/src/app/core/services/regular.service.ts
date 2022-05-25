import { NotifyService } from './notify.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegularService {

  logoutUser() {
    localStorage.clear()
    this.notify.logout()
    this.router.navigate([''])
  }

  constructor(
    private router:Router,
    private notify: NotifyService
  ) { }
}
