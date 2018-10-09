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
    this.menus = this.sidebarService.getMenus();
    this.url = location.hash.replace("#","");

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
    // 待重构，将子菜单添加到可检索的目录里
    this.searchList = [];
    this.loadSearchMenu(this.menus);
  }
  toPinyin(key): string {
    return pinyin(key,{style:pinyin.STYLE_NORMAL}).join("");
  }

  loadSearchMenu(menu): void {
    for(let item of menu){
      if(item.child){
        this.loadSearchMenu(item.child);
      }else{
        if(this.keyword && this.toPinyin(item.title).indexOf(this.keyword) >= 0){
          this.searchList.push({
            name:item.title,
            value:item.url
          });
        }
      }
    }
  }
}
