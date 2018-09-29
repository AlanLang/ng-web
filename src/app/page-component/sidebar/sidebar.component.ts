import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import { Router} from '@angular/router'; //导入router服务
import { SidebarService } from './sidebar.service'


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	@Input() isCollapsed = true;
	@Output () nzCollapsedChange = new EventEmitter<boolean>();
  
  menus = [];

  url = "";

  constructor(
    private router: Router,
    private sidebarService: SidebarService,) { }

  ngOnInit() {
    this.menus = this.sidebarService.getMenus();
    this.url = location.pathname;
    console.log(this.menus[0].child.find((element) => (element.url == this.url)));
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
}
