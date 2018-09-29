import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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


export class AuthenticateModel {
    userNameOrEmailAddress: string;
    password: string;
    rememberClient: boolean;
}

export class HttpAuthenticateResultModel{
    result?: AuthenticateResultModel;
    err?: string;
    success: boolean;
}

export class AuthenticateResultModel {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: number;
}
export interface IUserLoginInfoDto {
    name: string;
    surname: string;
    userName: string;
    emailAddress: string;
    id: number;
}
export class UserLoginInfoDto implements IUserLoginInfoDto {
    name: string;
    surname: string;
    userName: string;
    emailAddress: string;
    id: number;

    constructor(data?: IUserLoginInfoDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data["name"];
            this.surname = data["surname"];
            this.userName = data["userName"];
            this.emailAddress = data["emailAddress"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): UserLoginInfoDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserLoginInfoDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["userName"] = this.userName;
        data["emailAddress"] = this.emailAddress;
        data["id"] = this.id;
        return data; 
    }

    clone() {
        const json = this.toJSON();
        let result = new UserLoginInfoDto();
        result.init(json);
        return result;
    }
}

export class HttpUserLoginInfoResult{
    result?: any;
    err?: string;
    success: boolean;
}

export class HttpRolleInfoResult{
    err?: string;
    success: boolean;
    result?: RoleInfo
}

export class RoleInfo{
    exportname: string;
    sisplayName: string;
    description: string;
    id:number;
    permissions: string[];
}


// 登录接口
// in 用户名密码
// out token 数据
@Injectable()
export class TokenAuthServiceProxy {
    constructor(
    private http: HttpClient) { }

    authenticate(model: AuthenticateModel): Observable<HttpAuthenticateResultModel> {
        let url_ =  "/api/TokenAuth/Authenticate";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(model);
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
          

        return this.http
        .post<HttpAuthenticateResultModel>(url_, content_,httpOptions)
        // .catch( error => {
        //     let err = error.error.error;
        //     //console.error(error);
        //     if (err&&err.code == 0) {
        //         return Observable.of({success: false ,err : "用户名或密码错误！"});
        //     }else{
        //         return Observable.of({success: false ,err : "网络连接异常,登录失败。"});
        //     }
        // })
    }
}

/// 获取已登录的用户消息
@Injectable()
export class SessionServiceProxy {
    constructor(
    private http: HttpClient,
    private tokenService:TokenService) { }

    /**
     * @return Success
     */
    getCurrentLoginInformations(): Observable<HttpUserLoginInfoResult> {
        let url_ =   "/Session/GetCurrentLoginInformations";
        //let url_ =   "/api/heroes";
        return this.http.get(url_).map((guard: HttpUserLoginInfoResult) => {
          const guard$ = guard;
          return guard;
        });
    }
}

// 获取已登录的用户角色
@Injectable()
export class RoleServiceProxy{
    constructor(
    private http: HttpClient,
    private tokenService:TokenService) { }

        /**
     * @return Success
     */
    getRoleInformations(roleId: number): Observable<HttpRolleInfoResult> {
        let url_ =  `/Role/Get?id=${roleId}`;
        url_ = url_.replace(/[?&]$/, "");
        const content_ = JSON.stringify("");
        return this.http.get(url_).map((guard: HttpRolleInfoResult) => {
            console.log(guard)
          return guard;
        });
    }
}

// 获取用户的权限
@Injectable()
export class PermissionServiceProxy{
    constructor(
    private http: HttpClient,
    private tokenService:TokenService) { }

        /**
     * @return Success
     */
    GetUserPermission(roleId: number): Observable<HttpRolleInfoResult> {
        let url_ =  `/User/GetUserPermission?id=${roleId}`;
        url_ = url_.replace(/[?&]$/, "");
        const content_ = JSON.stringify("");
        return this.http.get(url_).map((guard: HttpRolleInfoResult) => {
          return guard;
        });
    }
}