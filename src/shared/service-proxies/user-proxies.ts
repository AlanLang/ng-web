import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { TokenService } from  '@shared/auth/token.service'

import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import * as moment from 'moment';

export class HttpResult{
  "error": any;
  "success": string;
  "result": any;
}

export class PageUserResult {
  "totalCount": number;
  "items": UserResult[];
}

export class UserResult{
  "id": number;
  "userName": string;
  "name": string;
  "surname": string;
  "emailAddress": string;
  "phoneNumber": string;
  "isActive": boolean;
  "fullName": string;
  "lastLoginTime": string;
  "creationTime": string;
  "roleNames": string[]
}

export class UserCreat{
  "userName": string;
  "name": string;
  "surname": string;
  "emailAddress": string;
  "isActive": true
  "roleNames": string[];
  "password": string;
}

export class CreateApprover{
  "userId": number;
  "approverId": number;
}

export class PageUserSearch{
	UserName?:string;
	SkipCount?:number;
	MaxResultCount?:number;
}

//分页获取用户数据
@Injectable()
export class UserPageServiceProxy{
    constructor(
    private http: HttpClient,
    private tokenService:TokenService) { }

        /**
     * @return Success
     */
    getAll(search: string): Observable<PageUserResult> {
        let url_ = `/api/services/app/User/GetAll`;
        if(search){
          url_ = `/api/services/app/User/GetAll?UserName=${search}`;
        }
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get(url_).map((guard: HttpResult) => {
          return guard.result;
        });
    }

    create(model: UserCreat):Observable<HttpResult>{
      model.roleNames = ["admin"];
      model.isActive = true;
      let url_ = `/api/services/app/User/Create`;
      url_ = url_.replace(/[?&]$/, "");
      const content_ = JSON.stringify(model);
      return this.http.post(url_,content_).map((guard: HttpResult) => {
        return guard;
      });
    }

    update(model: UserCreat):Observable<HttpResult>{
      let url_ = `/api/services/app/User/Update`;
      url_ = url_.replace(/[?&]$/, "");
      const content_ = JSON.stringify(model);
      return this.http.put(url_,content_).map((guard: HttpResult) => {
        return guard;
      });
    }

    updatePwd(model):Observable<HttpResult>{
      let url_ = `/api/services/app/User/UpdatePwd`;
      const content_ = JSON.stringify(model);
      return this.http.put(url_,content_).map((guard: HttpResult) => {
        return guard;
      });
    }

    get(id: number): Observable<HttpResult>{
      let url_ = `/api/services/app/User/Get?id=${id}`;
      url_ = url_.replace(/[?&]$/, "");
      return this.http.get(url_).map((guard: HttpResult) => {
        return guard;
      });
    }

    delete(id: number): Observable<HttpResult>{
      let url_ = `/api/services/app/User/Delete?id=${id}`;
      url_ = url_.replace(/[?&]$/, "");
      return this.http.delete(url_).map((guard: HttpResult) => {
        return guard;
      });
    }

    // 获取指定用户的审批人
    getApprovers(id: number):Observable<HttpResult>{
      let url_ = `/api/services/app/Approver/GetUserApprovers?id=${id}`;
      url_ = url_.replace(/[?&]$/, "");
      return this.http.get(url_).map((guard: HttpResult) => {
        const guard$ = guard;
        return guard;
      });
    }

    setApprovers(model: CreateApprover):Observable<HttpResult>{
      let url_ = `/api/services/app/Approver/Create`;
      url_ = url_.replace(/[?&]$/, "");
      const content_ = JSON.stringify(model);
      return this.http.post(url_,content_).map((guard: HttpResult) => {
        const guard$ = guard;
        return guard;
      });
    }

    removeApprovers(userId,approverId):Observable<HttpResult>{
      let url_ = `/api/services/app/Approver/Remove?UserId=${userId}&ApproverId=${approverId}`;
      return this.http.delete(url_).map((guard: HttpResult) => {
        const guard$ = guard;
        return guard;
      });
    }
}