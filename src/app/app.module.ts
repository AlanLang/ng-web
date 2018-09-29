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
import { TitleComponent } from './title/title.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { ChartModule } from './chart/chart.module';
import { ComponentModule } from './component/component.module'
import { BuyModule} from './buy/buy.module'

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { MyHttpInterceptor }   from '@shared/util/InterceptorService';

import { ServiceProxiesModule } from '../shared/service-proxies/service-proxies.module'
import { CookieService } from 'ngx-cookie-service';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { SessionService } from '@shared/auth/session.service';
import { TokenService } from '@shared/auth/token.service';
import { ExceptionModule } from './exception/exception.module';
import { UserComponent } from './pages/user/user.component';
import { BuycontentComponent } from './buy/buycontent/buycontent.component';
import { SysuserComponent } from './pages/sysuser/sysuser.component';
import { UserAddComponent } from './pages/user-add/user-add.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component' 
import { MomentModule } from 'angular2-moment';


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
    HomeComponent,
    LoginComponent,
    UserComponent,
    BuycontentComponent,
    SysuserComponent,
    UserAddComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    ChartModule,
    ComponentModule,
    ReactiveFormsModule,
    ServiceProxiesModule,
    ExceptionModule,
    BuyModule,
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
