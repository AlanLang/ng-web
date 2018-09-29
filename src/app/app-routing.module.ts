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
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

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
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'page', component: ContentComponent, children:appChildRoutes,canActivate: [AppRouteGuard]},
	{ path: '', redirectTo: '/page/home', pathMatch: 'full' ,canActivate: [AppRouteGuard]},
	{path: '**', redirectTo: "/page/home"},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
