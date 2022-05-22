import { GlobalUrl } from './../../global-url';
import { RegularService } from './../services/regular.service';
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

import { catchError, Observable, switchMap, throwError } from 'rxjs';


@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {

  refreshed: boolean = false;
  refreshRequest: boolean = false;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private regularService: RegularService,
    private globalUrl: GlobalUrl
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let reqAuth;

    if (this.refreshRequest) {
      reqAuth = request.clone({
        setHeaders: {
          Authorization: "Bearer " + this.tokenService.getRefreshToken()
        }
      })
      this.refreshRequest = false;
    }

    else {
      reqAuth = request.clone({
        setHeaders: {
          Authorization: "Bearer " + this.tokenService.getAuthToken()
        }
      })
    }

    return next.handle(reqAuth).pipe(catchError((err: HttpErrorResponse) => {
      if (err && err.status == 401 && !this.refreshed) {
        this.refreshed = true;
        this.refreshRequest = true;
        return this.http.post(this.globalUrl+'/token', "").pipe(
          switchMap((res: any) => {
            this.tokenService.saveAuthToken(res.authToken)
            this.refreshed = false
            return next.handle(request.clone({
              setHeaders: {
                Authorization: "Bearer " + this.tokenService.getAuthToken()
              }
            }));
          })
        ).pipe(catchError((err: HttpErrorResponse) => {
          if (err && err.status == 401) {
            this.regularService.logoutUser()
          }
          return throwError(() => err);
        }))
      }
      return throwError(() => err);

    }));


  }

}