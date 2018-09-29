import { Component, OnInit, Input } from '@angular/core';
import { Router} from '@angular/router'; //导入router服务
import { NzMessageService } from 'ng-zorro-antd';
import { TokenService } from '@shared/auth/token.service'
import { SessionService } from '@shared/auth/session.service'

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

	nzText = "";
	showBar = false;

	divIn = false;

  userName = "";

	@Input() nzUser = "";
	@Input() nzIcon = "";
	@Input() nzSrc = "";

  constructor(
    private router: Router,
    private message: NzMessageService,
    private session: SessionService,
    private token: TokenService) { }

  ngOnInit() {
  	this.setNzText();
    this.userName = this.session.user.userName;

  }

  setNzText():void {
  	if (this.nzText) {
  		this.nzText = this.nzUser.substr(0,1).toUpperCase();
  	}
  }

  onClickAvatar(){
    if (this.showBar) {
      this.showBar =false;
    }else{
      this.showBar = true;
    }
  }
  mouseEnter(divIn:boolean): void {
  	this.divIn = divIn;
  	this.showBar = true;
  }

  mouseLeave(divIn:boolean): void {
  	if (divIn) {
  		this.showBar = false;
  		return;
  	}
	   setTimeout(() => {
			if (!this.divIn) {
				this.showBar = false;
				this.divIn =false;
			}
    }
    , 200);
  }
  logOut(): void {
    const id = this.message.loading('正在退出系统', { nzDuration: 0 }).messageId;
    setTimeout(() => {
      this.token.clearToken();
      this.message.remove(id);
      this.router.navigateByUrl("/login");
    }
    , 1000);
  }
}
