import { Injectable } from '@angular/core';
import { SessionServiceProxy,UserLoginInfoDto,HttpUserLoginInfoResult,
 PermissionServiceProxy,HttpRolleInfoResult} from '@shared/service-proxies/service-proxies'
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _user: UserLoginInfoDto;
  private _permission: any

  constructor(
  	private _sessionService: SessionServiceProxy,
  	private _permissionService: PermissionServiceProxy
  	) { }

	get user(): UserLoginInfoDto {
	  return this._user;
	}

	get Permission(): any {
		return this._permission;
	}

	hasPermission(permissionName: string):boolean {
		for(let item of this._permission){
			if(item.name && item.name == permissionName){
				return true;
			}else{return false;}
		}
	}

	init(): Promise<boolean> {
	  return new Promise<boolean>((resolve, reject) => {
	      this._sessionService.getCurrentLoginInformations().toPromise().then((result: HttpUserLoginInfoResult) => {
	      	this._user = result.result.user;
	      	if (this._user) {
		      	this._permissionService.GetUserPermission(this._user.id).toPromise().then((result:HttpRolleInfoResult) =>{
		      		this._permission = result.result;
		      		resolve(true);
		      	});
	      	}else{
	      		resolve(true);
	      	}
	      }, (err) => {
	          reject(err);
	      });
	  });
	}
}
