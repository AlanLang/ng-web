import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageUserResult,UserResult,PageUserSearch,UserPageServiceProxy} from '@shared/service-proxies/user-proxies';

@Component({
  selector: 'app-sysuser',
  templateUrl: './sysuser.component.html',
  styleUrls: ['./sysuser.component.css']
})
export class SysuserComponent implements OnInit {

	loading = false;
	total = 0;
	data = [];
  IsActive = 'false';
  constructor(
    private userPageServiceProxy: UserPageServiceProxy,
    private _router: Router) { }

  ngOnInit() {
  	this.onSearch("");
  }

  ngAfterViewChecked(){
  }

  //TODO 加入是否停用的过滤
  onSearch(search: string): void {
  	this.loading = true;
  	this.userPageServiceProxy
    .getAll(search)
    .subscribe((re: PageUserResult)=>{
      this.total = re.totalCount;
      this.data = re.items;
      this.loading = false;
    }, 
    (err) => {})
  }

  onAdd():void {
  	this._router.navigate(['/page/useradd']);
  }

  edit(iten): void {
    
  }

}
	