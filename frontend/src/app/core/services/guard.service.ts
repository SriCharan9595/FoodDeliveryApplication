import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor() { }
  IsLoggedIn(){
    return !!localStorage.getItem('authToken');    
  }
}
