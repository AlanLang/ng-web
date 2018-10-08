import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor,HttpErrorResponse,HttpResponse} from '@angular/common/http';
import { catchError,mergeMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { AppConsts } from '@shared/AppConsts'
import { TokenService } from  '@shared/auth/token.service'
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(
    private tokenService:TokenService,
    private nzMessage: NzMessageService,
    private injector: Injector
  ) { }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private handleData(
    event: HttpResponse<any> | HttpErrorResponse,
  ): Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    //this.injector.get(_HttpClient).end();
    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 例如响应内容：
        //  错误内容：{ status: 1, msg: '非法参数' }
        //  正确内容：{ status: 0, response: {  } }
        // 则以下代码片断可直接适用
        // if (event instanceof HttpResponse) {
        //     const body: any = event.body;
        //     if (body && body.status !== 0) {
        //         this.msg.error(body.msg);
        //         // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
        //         // this.http.get('/').subscribe() 并不会触发
        //         return throwError({});
        //     } else {
        //         // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
        //         return of(new HttpResponse(Object.assign(event, { body: body.response })));
        //         // 或者依然保持完整的格式
        //         return of(event);
        //     }
        // }
        break;
      case 401: // 未登录状态码
        this.goTo('/login');
        break;
      case 403:
        this.goTo(`/page/403`);
        break;
      case 404:
      case 500:
      default:
        if (event instanceof HttpErrorResponse) {
          console.warn(
            '未可知错误，大部分是由于后端不支持CORS或无效配置引起',
            event,
          );
          this.nzMessage.error(event.message);
        }
        break;
    }
    return of(event);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let httpUrl = request.url.replace(/[?&]$/, "");
    const authRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenService.token()
      },
      url: `${AppConsts.apiUrl}${httpUrl}`
    });

    return next.handle(authRequest)
      .pipe(
        mergeMap((event: any) => {
          //业务处理
          if (event instanceof HttpResponse && event.status === 200)
            return this.handleData(event);
          // 若一切都正常，则后续操作
          return of(event);
        }),
        catchError(err => {
          if (err.status<200 || err.status>=300){
            console.error(err);
            this.nzMessage.error("网络连接异常或接口地址不存在！");
          }
          return throwError(err);
        })
      );
  }
}