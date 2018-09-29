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
  "err": string;
  "success": string;
  "result": any;
}

export class HttpPageResult{
	totalCount: number;
	item: BuyListDto[];
}
export class BuyListDto{
  "buyName": string;
  "buyPrice": number;
  "buyUrl": string;
  "buyTypeName": string ;
  "buyLevel": string;
  "buyTime": string;
  "buyAuthor": string;
  "buyState": number;
  "buyDesc": string;
  "id": number;
  "creationTime": string;
}
export class CreatBuyListDto{
  "buyName": string;
  "buyPrice": number;
  "buyUrl": string;
  "buyTypeName": string ;
  "buyLevel": string;
  "buyTime": string;
  "buyAuthor": string;
  "buyState": number;
  "buyDesc": string;
}

export class CreatDisscuesDto{
  "buyListId": number;
  "isAgree": boolean;
  "discuss": string;
}

export class DisscuesDto{
  "buyListId": number;
  "isAgree": boolean;
  "discuss": string;
  "creationTime": number;
  "userName": string;
  "Name": string;
}

//分页获取用户数据
@Injectable()
export class BuyListServiceProxy{
    constructor(
	    private http: HttpClient,
	    private tokenService:TokenService) { }

    Create(model: CreatBuyListDto): Observable<HttpResult> {
    	const content_ = JSON.stringify(model);
	    let url_ = `/BuyList/Create`;
	    url_ = url_.replace(/[?&]$/, "");
	    return this.http.post(url_,content_).map((guard: HttpResult) => {
	      return guard;
	    });
    }

    Get(id: number): Observable<HttpResult>{
      let url_ = `/BuyList/Get?id=${id}`;
      url_ = url_.replace(/[?&]$/, "");
      return this.http.get(url_).map((guard: HttpResult) => {
        return guard;
      });
    }

    Update(model: CreatBuyListDto): Observable<HttpResult> {
      const content_ = JSON.stringify(model);
      let url_ = `/BuyList/Update`;
      url_ = url_.replace(/[?&]$/, "");
      return this.http.put(url_,content_).map((guard: HttpResult) => {
        return guard;
      });
    }

    GetAll(search: string, type: number): Observable<HttpResult>{
	    let url_ = `/BuyList/GetAll?search=${search}&type=${type}`;
	    url_ = url_.replace(/[?&]$/, "");
	    return this.http.get(url_).map((guard: HttpResult) => {
	      return guard;
	    });
    }

    //获取需要审批的列表
    GetNeedCheck(search: string, type:number): Observable<HttpResult>{
      let url_ = `/BuyList/GetBuysNeedCheck?search=${search}&type=${type}`;
      url_ = url_.replace(/[?&]$/, "");
      return this.http.get(url_).map((guard: HttpResult) => {
        return guard;
      });
    }

    CreatDisscues(model: CreatDisscuesDto): Observable<HttpResult> {
      const content_ = JSON.stringify(model);
      let url_ = `/Disscues/Create`;
      url_ = url_.replace(/[?&]$/, "");
      return this.http.post(url_,content_).map((guard: HttpResult) => {
        return guard;
      });
    }

    GetDisscues(id: number): Observable<HttpResult> {
      let url_ = `/Disscues/GetAll?id=${id}`;
      url_ = url_.replace(/[?&]$/, "");
      return this.http.get(url_).map((guard: HttpResult) => {
        return guard;
      });
    }
}