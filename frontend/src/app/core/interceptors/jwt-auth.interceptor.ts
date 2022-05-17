import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';


@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let reqAuth = request.clone({
      setHeaders: {
        Authorization: "Bearer "+this.tokenService.getAuthToken()
      }
    })
    return next.handle(reqAuth)
    
  }


  
}