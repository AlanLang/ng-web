import {
  Injectable,
 } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AppConsts } from '@shared/AppConsts'
import { TokenService } from  '@shared/auth/token.service'
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(
    private tokenService:TokenService,
    private nzMessage: NzMessageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let httpUrl = request.url.replace(/[?&]$/, "");
    const authRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenService.token()
      },
      //url: `${AppConsts.apiUrl}/${request.url}`
      url: `${AppConsts.apiUrl}${httpUrl}`
    });

    return next.handle(authRequest)
      .pipe(
        catchError(err => {
          if (err.status<200 || err.status>=300){
            console.error(err);
            this.nzMessage.error("接口访问错误");
          }
          return throwError(err);
        })
      );
  }
}