import { Injectable } from '@angular/core';
import { Menu } from './Menu';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

	menus: Menu[] = [
		{title:'系统管理',url:'',icon:'anticon-setting',child:
			[
				{title:'用户管理',url:'/page/user',icon:'',child:null},
				{title:'购物类别定义',url:'/page/nopms',icon:'',child:null}
			]
		},
		{title:'基本信息',url:'',icon:'anticon-setting',child:
			[
				{title:'1',url:'/page/nopms',icon:'',child:null},
				{title:'2',url:'/page/nopms',icon:'',child:null},
				{title:'3',url:'',icon:'',child:[
					{title:'3-1',url:'/page/nopms',icon:'',child:null},
					{title:'3-2',url:'/page/nopms',icon:'',child:null}
				]},
			]
		}
	];
  constructor() { }

  getMenus():any {
  	return this.menus;
  }
}
