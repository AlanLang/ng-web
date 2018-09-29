import { Component, OnInit, Input } from '@angular/core';
import { NoticeService }  from './notice.service';
import { BuyListDto,BuyListServiceProxy,HttpResult } from '@shared/service-proxies/buy-proxies'
import { Notice } from './Notice';
import { Router} from '@angular/router'; //导入router服务

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

	@Input() hasDot = false;
	divIn = false;
	showBar = false;
  notices:Notice[];

  constructor(
    private noticeService: NoticeService,
    private router: Router,
    private buyListService: BuyListServiceProxy
  ) { }

  ngOnInit() {
    this.getNotices();
    window.setInterval(this.getNotices(),1000*5); 
  }

  onClickNotice(){
    if(this.showBar){
      this.showBar = false;
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
    , 100);
  }

  getNotices():any {
    console.log(`开始获取提醒`);
    this.buyListService.GetNeedCheck("",0)
    .subscribe((re: HttpResult)=>{
      this.notices = re.result.items;
      if(this.notices&&this.notices.length > 0){
        this.hasDot = true;
      }
    }, 
    (err) => {
      console.log(err);
    });
  }

  openCheck(id: number):void {
    this.router.navigateByUrl(`buy/check/${id}`);
  }

  openAllCheck():void {
    this.router.navigateByUrl(`buy/history`);
  }
}
