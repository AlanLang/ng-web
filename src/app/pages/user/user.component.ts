import { Component, OnInit } from '@angular/core';
import { PageUserResult,UserResult,PageUserSearch,UserPageServiceProxy} from '@shared/service-proxies/user-proxies';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  titles = ['系统管理','用户管理'];
  loading = false;
  formOptions = 
  [
  	{title:'用户姓名',name:'username',type:'input',placeholder:'请输入用户姓名'},
  ];
  pageIndex = 1;
  searchItem :PageUserSearch = {
    UserName:'',
    SkipCount:0,
    MaxResultCount:10
  };
  dataSet: UserResult[];
  total = 1;
  pageSize = 10;

  constructor(
    private userPageServiceProxy: UserPageServiceProxy) { }

  ngOnInit() {
    this.searchData();
  }
  onFormReset(): void {
    this.searchItem.UserName = "";
    this.searchData(true);
  }
  onFormSearch(data): void{
    if (data.value.username) {
      this.searchItem.UserName = data.value.username;
    }
    this.searchData();
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.userPageServiceProxy
    .getAll(this.searchItem.UserName)
    .subscribe((re: PageUserResult)=>{
      this.loading = false;
      this.total = re.totalCount;
      this.dataSet = re.items;
    }, 
    (err) => {})
  }

}
