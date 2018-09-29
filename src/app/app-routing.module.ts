import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }      from './pages/home/home.component';
import { UserComponent }      from './pages/user/user.component';
import { SysuserComponent }      from './pages/sysuser/sysuser.component';
import { UserAddComponent }      from './pages/user-add/user-add.component';
import { UserEditComponent }      from './pages/user-edit/user-edit.component';
import { NopermissionComponent }  from './exception/nopermission/nopermission.component'

import { LoginComponent } from './login/login.component';
import { ContentComponent } from './content/content.component';
import { BuycontentComponent } from './buy/buycontent/buycontent.component'
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

import { BuyhomeComponent } from './buy/buyhome/buyhome.component'
import { BuyaddComponent } from './buy/buyadd/buyadd.component'
import { BuyitemComponent } from './buy/buyitem/buyitem.component'
import { BuycheckComponent } from './buy/buycheck/buycheck.component'
import { HistoryComponent } from './buy/history/history.component'


const appChildRoutes: Routes = [
 {path: "home", component: HomeComponent},
 {path: "403", component: NopermissionComponent},
 {path: "useradd", component: UserAddComponent,canActivate: [AppRouteGuard]},
 {path: "useredit/:id", component: UserEditComponent,canActivate: [AppRouteGuard]},
 {path: "user", component: SysuserComponent,data: { translate: 'user', permission: 'Pages.Users' },canActivate: [AppRouteGuard]},
 {path: "nopms", component: SysuserComponent,data: { translate: 'nopms', permission: 'Pages.Nopms' },canActivate: [AppRouteGuard]},
 // 如果地址栏中输入没有定义的路由就跳转到one路由界面
 {
  path: '**', redirectTo: "home"
 }
];
const buyChildRoutes: Routes = [
	{path: "home", component: BuyhomeComponent,canActivate: [AppRouteGuard]},
	{path: "add", component: BuyaddComponent,canActivate: [AppRouteGuard]},
	{path: "item/:id", component: BuyitemComponent,canActivate: [AppRouteGuard]},
 	{path: "check/:id", component: BuycheckComponent,canActivate: [AppRouteGuard]},
 	{path: "history", component: HistoryComponent,canActivate: [AppRouteGuard]},
	{path: '**', redirectTo: "home"},
];
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'page', component: ContentComponent, children:appChildRoutes,canActivate: [AppRouteGuard]},
  { path: 'buy', component: BuycontentComponent, children:buyChildRoutes,canActivate: [AppRouteGuard]},
	{ path: '', redirectTo: '/buy/home', pathMatch: 'full' ,canActivate: [AppRouteGuard]},
	{path: '**', redirectTo: "/buy/home"},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
