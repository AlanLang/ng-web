import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import { Router} from '@angular/router'; //导入router服务
import { SidebarService } from './sidebar.service'
var pinyin = require("pinyin");

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	@Input() isCollapsed = true;
	@Output () nzCollapsedChange = new EventEmitter<boolean>();
  
  menus = [];
  searchList = [];
  keyword = "";
  url = "";

  constructor(
    private router: Router,
    private sidebarService: SidebarService,) { }

  ngOnInit() {
    console.log(pinyin("中心").STYLE_NORMAL);
    this.menus = this.sidebarService.getMenus();
    this.url = location.hash.replace("#","");
    // 待重构，将子菜单添加到可检索的目录里
    for(let menu of this.menus){
      if(menu.child){
         for(let child of menu.child){
           if(child.child){
             for(let ch of child.child){
               this.searchList.push({
                  name:ch.title,
                  value:ch.url
                })
             }
           }else{
            this.searchList.push({
              name:child.title,
              value:child.url
            })
           }
         }
      }else{
        this.searchList.push({
          name:menu.title,
          value:menu.url
        })
      }
    }
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.nzCollapsedChange.emit(this.isCollapsed);
  }

  homeClick():void {
    this.router.navigateByUrl("home");
  }
  canOpen(menu): boolean{
    if (menu.child && menu.child.find((element) => (element.url == this.url))) {
      return true;
    }else{return false;}
  }
  menuSearch(event): void {
    this.keyword = event.srcElement.value;
  }
}
