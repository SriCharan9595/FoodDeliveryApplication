import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  getAuthToken() {
    return localStorage.getItem("authToken")
  }

  saveAuthToken(authToken:any) {
    localStorage.setItem("authToken",authToken)
  }

  getRefreshToken() {
    return localStorage.getItem("refreshToken")
  }

  saveRefreshToken(refreshToken:any) {
    localStorage.setItem("refreshToken",refreshToken)
  }

  constructor() { }
}
