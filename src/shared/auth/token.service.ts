import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  appPath = '/';
  tokenCookieName = 'Abp.AuthToken';
  domain = undefined;
  encrptedAuthTokenName: 'enc_auth_token'

  constructor(private cookie: CookieService) { }

  //获取指定token
  token(){
  	return this.getToken(this.tokenCookieName);
  }
	getToken(key: string): string {
		const equalities = document.cookie.split('; ');
		for (let i = 0; i < equalities.length; i++) {
			if (!equalities[i]) {
			    continue;
			}
			const splitted = equalities[i].split('=');
			if (splitted.length !== 2) {
			    continue;
			}
			if (decodeURIComponent(splitted[0]) === key) {
			    return decodeURIComponent(splitted[1] || '');
			}
		}
		return null;
	}
  // 获取token名称
	getTokenCookieName(): string {
		return this.tokenCookieName;
	}
  // 清空token
	clearToken(): void {
	  this.setToken(null,null);
	}

	// 设置token
	setToken(authToken: string, expireDate?: Date): void {
	  let cookieValue = encodeURIComponent(this.tokenCookieName) + '=';
    if (authToken) {
        cookieValue = cookieValue + encodeURIComponent(authToken);
    }
    if (expireDate) {
        cookieValue = cookieValue + '; expires=' + expireDate.toUTCString();
    }
    if (this.appPath) {
        cookieValue = cookieValue + '; path=' + this.appPath;
    }
    if (this.domain) {
        cookieValue = cookieValue + '; domain=' + this.domain;
    }
    document.cookie = cookieValue;
	}

	getCookieValue(key: string): string {
	  return this.cookie.get(key);
	}

	setCookieValue(key: string, value: string, expireDate?: Date, path?: string): void {
	  this.cookie.set(key, value, expireDate, path);
	}

	deleteCookie(key: string, path?: string): void {
	  this.cookie.delete(key, path);
	}
}
