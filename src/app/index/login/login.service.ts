import { Injectable } from '@angular/core';
import { AuthenticateModel,TokenAuthServiceProxy,HttpAuthenticateResultModel} from '@shared/service-proxies/service-proxies';
import { LoggerService } from '@shared/util/logger.service'
import { TokenService } from '@shared/auth/token.service';
import { SessionService } from '@shared/auth/session.service'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authenticateModel: AuthenticateModel = {
  	userNameOrEmailAddress :"",
  	password:"",
  	rememberClient:false
  };

  constructor( 
    private _tokenAuthService: TokenAuthServiceProxy,
    private _tokenService: TokenService,
    private _logService: LoggerService,
    private _sessionService:SessionService
    ) { }

	login(finallyCallback?: (err:HttpAuthenticateResultModel) => void): void {
	  finallyCallback = finallyCallback || (() => { });
    this._tokenAuthService
        .authenticate(this.authenticateModel)
        .subscribe((result: HttpAuthenticateResultModel) => {
            if (result.success) {
              this.setLogin(result.result.accessToken,result.result.encryptedAccessToken,result.result.expireInSeconds,this.authenticateModel.rememberClient);
              this._sessionService.init().then((success) =>{
                 if (success) {
                   finallyCallback(result)
                 }else{
                   result.success = false;
                   result.err = "登录验证失败";
                   finallyCallback(result)
                 }
              });
            }else{
              this._logService.warn("系统登录失败:",result);
            }
        },(err) => {
          let result = {
            success:false,
            err: "登录验证失败,用户名或密码错误"
          };
          finallyCallback(result)
        });
	}

  setLogin(accessToken: string, encryptedAccessToken: string, expireInSeconds: number, rememberMe?: boolean){
    var tokenExpireDate = rememberMe ? (new Date(new Date().getTime() + 1000 * expireInSeconds)) : undefined;
    this._tokenService.setToken(
      accessToken,
      tokenExpireDate
    );

    this._tokenService.setCookieValue(
        this._tokenService.encrptedAuthTokenName,
        encryptedAccessToken,
        tokenExpireDate,
        this._tokenService.appPath
    );

  }
}

