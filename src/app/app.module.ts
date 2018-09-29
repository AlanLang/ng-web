import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Injector,APP_INITIALIZER } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { TitleComponent } from './page-component/title/title.component';
import { SidebarComponent } from './page-component/sidebar/sidebar.component';
import { ContentComponent } from './page-component/content/content.component';
import { AppRoutingModule } from './/app-routing.module';

import { ComponentModule } from './component/component.module'

import { LoginComponent } from './index/login/login.component';
import { LoginService } from './index/login/login.service';
import { MyHttpInterceptor }   from '@shared/util/InterceptorService';

import { ServiceProxiesModule } from '../shared/service-proxies/service-proxies.module'
import { CookieService } from 'ngx-cookie-service';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { SessionService } from '@shared/auth/session.service';
import { TokenService } from '@shared/auth/token.service';
import { ExceptionModule } from './exception/exception.module';

import { MomentModule } from 'angular2-moment';
import { PagesModule } from './pages/pages.module'


export function interceptorFactory(tokenService:TokenService){
   let service = new MyHttpInterceptor(tokenService);
   return service;
}

export function appInitializerFactory(injector: Injector) {
  return () => {
    return new Promise<boolean>((resolve, reject) => {
        var appSessionService: SessionService = injector.get(SessionService);
        appSessionService.init().then(
          (result) => {
            resolve(result);
          },
          (err) => {
            reject(err);
          }
        );
      });
  }
}
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    SidebarComponent,
    ContentComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    ComponentModule,
    ReactiveFormsModule,
    ServiceProxiesModule,
    ExceptionModule,
    PagesModule,
    MomentModule
  ],
  providers: [LoginService,CookieService,AppRouteGuard,SessionService,
  { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true},
  { provide: NZ_I18N, useValue: zh_CN },
  {provide: LocationStrategy, useClass: HashLocationStrategy},
 { provide: APP_INITIALIZER,useFactory: appInitializerFactory,deps: [Injector],multi: true},],
  bootstrap: [AppComponent],
})
export class AppModule { }
