import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from '../component/component.module'
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { SysuserComponent } from './sysuser/sysuser.component';
import { UserEditComponent } from './user-edit/user-edit.component' 
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    ComponentModule,
    AppRoutingModule,

  ],
  declarations: [
	  HomeComponent,
	  UserComponent,
	  UserAddComponent,
	  SysuserComponent,
    UserEditComponent
  ],
  exports:[
	  HomeComponent,
	  UserComponent,
	  UserAddComponent,
	  SysuserComponent,
	  UserEditComponent
  ],
})
export class PagesModule { }