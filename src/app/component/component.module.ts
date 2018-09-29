import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { AvatarComponent } from './avatar/avatar.component';
import { NoticeComponent } from './notice/notice.component';
import { SearchTableComponent } from './search-table/search-table.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { TitleButtonComponent } from './title-button/title-button.component';
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule
  ],
  declarations: [
  	AvatarComponent,
  	NoticeComponent,
  	SearchTableComponent,
  	BreadcrumbComponent,
  	SearchFormComponent,
  	SearchPageComponent,
  	ButtonGroupComponent,
  	CopyrightComponent,
  	TitleButtonComponent
  ],
  exports:[
	  AvatarComponent,
	  NoticeComponent,
	  SearchTableComponent,
    BreadcrumbComponent,
    SearchFormComponent,
    SearchPageComponent,
    ButtonGroupComponent,
    CopyrightComponent,
    TitleButtonComponent
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class ComponentModule { }
