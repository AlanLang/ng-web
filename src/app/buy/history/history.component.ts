import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuyListDto,BuyListServiceProxy,HttpResult } from '@shared/service-proxies/buy-proxies'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  data :BuyListDto[] = [];
  isLoading = false;
  
  constructor(private _router: Router,private buyListServiceProxy:BuyListServiceProxy) { }

  ngOnInit() {
  	this.onSearch("");
  }
  onListClick(id: number): void{
    this._router.navigate([`/buy/check/${id}`]);
  }
  onSearch(search: string): void {
  	this.isLoading = true;
  	this.buyListServiceProxy.GetNeedCheck(search,1)
  	.subscribe((re: HttpResult)=>{
  		this.data = re.result.items;
  		this.isLoading = false;
	}, 
	(err) => {
		console.log(err);
	})
  }

}
