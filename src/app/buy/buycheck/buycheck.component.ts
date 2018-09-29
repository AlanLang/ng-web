import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params,Router,NavigationEnd} from '@angular/router';
import { CreatBuyListDto,BuyListDto,BuyListServiceProxy,HttpResult } from '@shared/service-proxies/buy-proxies'

@Component({
  selector: 'app-buycheck',
  templateUrl: './buycheck.component.html',
  styleUrls: ['./buycheck.component.css']
})
export class BuycheckComponent implements OnInit {
  id = 0;
  datas :string[] = [
  ];
  listLoading = false;
  title = "";
  constructor(
	private route: ActivatedRoute,
	private buyListService: BuyListServiceProxy) { }

  ngOnInit() {
  	this.route.params.subscribe((params: Params) => { 
			this.id = this.route.snapshot.params['id'];
			this.getBuyItem();
    }); 
  }
	getBuyItem(): void {
		this.listLoading = true;
  	this.buyListService.Get(this.id)
      .subscribe((re: HttpResult)=>{
		  if (re.success) {
		  	this.datas = [];
		  	this.datas.push(`物品名称: ${re.result.buyName}`);
		  	this.datas.push(`物品类别: ${re.result.buyTypeName}`);
		  	this.datas.push(`物品价格: ${re.result.buyPrice}元`);
		  	this.datas.push(`物品类别: ${re.result.buyTypeName}`);
		  	this.datas.push(`重要程度: ${re.result.buyLevel}`);
		  	this.datas.push(`购买地址: ${re.result.buyUrl}`);
		  	this.datas.push(`购买时间: ${re.result.buyTime}`);
		  	this.datas.push(`描述: ${re.result.buyDesc}`);
		  	this.listLoading = false;
		  	this.title = `${re.result.buyAuthor}的购物申请`;
		  }else{
		  }
	}, 
	(err) => {})
  }

}
