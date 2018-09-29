import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BuyhomeComponent } from './buyhome/buyhome.component';
import { BuyaddComponent } from './buyadd/buyadd.component';
import { BuyitemComponent } from './buyitem/buyitem.component';
import {RouterModule, Routes} from "@angular/router";
import { DiscussesComponent } from './discusses/discusses.component';
import { BuycheckComponent } from './buycheck/buycheck.component';
import { HistoryComponent } from './history/history.component';
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MomentModule
  ],
  declarations: [BuyhomeComponent, BuyaddComponent, BuyitemComponent, 
  DiscussesComponent, BuycheckComponent, HistoryComponent],
  exports:[BuyhomeComponent,BuyaddComponent,BuyitemComponent,DiscussesComponent,BuycheckComponent,HistoryComponent]
})
export class BuyModule { }
