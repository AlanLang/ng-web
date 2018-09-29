import { Injectable } from '@angular/core';
import { Notice } from './Notice';
import { BuyListDto,BuyListServiceProxy,HttpResult } from '@shared/service-proxies/buy-proxies'

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private buyListService: BuyListServiceProxy) { }

  getNotices():any {
  	this.buyListService.GetNeedCheck("",0)
  	.subscribe((re: HttpResult)=>{
  		return re.result.items
		}, 
		(err) => {
			console.log(err);
		});
  }
}
