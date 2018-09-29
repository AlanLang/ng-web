import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as ApiServiceProxies from './service-proxies';
import * as UserServiceProxies from './user-proxies';
import * as BuyServiceProxies from './buy-proxies';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.PermissionServiceProxy,
        UserServiceProxies.UserPageServiceProxy,
        BuyServiceProxies.BuyListServiceProxy
    ]
})
export class ServiceProxiesModule { }
