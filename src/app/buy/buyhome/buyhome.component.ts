import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuyListDto,BuyListServiceProxy,HttpResult } from '@shared/service-proxies/buy-proxies'
import { MomentModule } from 'angular2-moment';

@Component({
  selector: 'app-buyhome',
  templateUrl: './buyhome.component.html',
  styleUrls: ['./buyhome.component.css']
})
export class BuyhomeComponent implements OnInit {
  data :BuyListDto[] = [];
  data1 :BuyListDto[] = [];

  constructor(private _router: Router,private buyListServiceProxy:BuyListServiceProxy) { }
  isLoading = false;
  isLoading1 = false;

  ngOnInit() {
  	this.onSearch("");
    this.onSearchChecked("");
  }
  onAdd(): void {
  	this._router.navigate(['/buy/add']);
  }
  onListClick(id: number): void{
    this._router.navigate([`/buy/item/${id}`]);
  }
  onSearchBuy(search: string):void {
    this.onSearch(search);
    this.onSearchChecked(search);
  }
  onSearch(search: string): void {
  	this.isLoading = true;
  	this.buyListServiceProxy.GetAll(search,0)
  	.subscribe((re: HttpResult)=>{
  		this.data = re.result.items;
  		this.isLoading = false;
	}, 
	(err) => {
		console.log(err);
	})
  }
  onSearchChecked(search: string): void {
    this.isLoading1 = true;
    this.buyListServiceProxy.GetAll(search,1)
    .subscribe((re: HttpResult)=>{
      this.data1 = re.result.items;
      this.isLoading1 = false;
  }, 
  (err) => {
    console.log(err);
  })
  }
}
