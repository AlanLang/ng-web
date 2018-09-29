import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs/Rx';
import { Router} from '@angular/router'; //导入router服务
import { CreatBuyListDto,BuyListDto,BuyListServiceProxy,HttpResult } from '@shared/service-proxies/buy-proxies'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-buyitem',
  templateUrl: './buyitem.component.html',
  styleUrls: ['./buyitem.component.css']
})
export class BuyitemComponent implements OnInit {
  validateForm: FormGroup;
  isSmall = false;
  isLoading = false;
  id = 0;
  buyList: BuyListDto;
  canBuy = false;
  goBuy = false;
  notBuy = false;
  isBuy = false;


  constructor(
  	private route: ActivatedRoute,
  	private nzMessage: NzMessageService,
  	private fb: FormBuilder,
  	private buyListService: BuyListServiceProxy) { 
  	this.validateForm = this.fb.group({
      BuyName: [ '', [ Validators.required ]],
      BuyTypeName   : [ '', [ Validators.required ] ],
      BuyLevel: [ '', [ Validators.required ] ],
      BuyUrl: [ '', [ Validators.required ] ],
      BuyTime: [ '', [ Validators.required ] ],
      BuyPrice : [ '', [ this.confirmValidator ] ],
      BuyDesc : [ '', [] ],
      id:'',
      BuyState:''
    });
  }

  confirmValidator = (control: FormControl): { [ s: string ]: boolean } => {
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if (!control.value) {
      return { required: true };
    } else if (!reg.test(control.value)) {
      return { confirm: true, error: true };
    }
  };

  ngOnInit() {
  	this.id = this.route.snapshot.params['id'];
  	this.getBuyItem();
     this.configWidth();
     this.validateForm.reset();
     Observable.fromEvent(window, 'resize') 
     .debounceTime(100) 
     .subscribe((event) => { 
       this.configWidth();
     }); 
  }

  configWidth() { 
    if (window.innerWidth < 400) {
      this.isSmall = true;
    }else{
      this.isSmall = false;
    }
  } 

  getBuyItem(): void {
  	this.buyListService.Get(this.id)
      .subscribe((re: HttpResult)=>{
		  if (re.success) {
		   this.buyList = re.result;
       console.log(this.buyList)
       if(this.buyList.buyState == 3){
         this.canBuy = true;
       }
       if(this.buyList.buyState == 5){
         this.isBuy = true;
       }
       this.validateForm.setValue({
	      BuyName: this.buyList.buyName,
	      BuyTypeName: this.buyList.buyTypeName,
	      BuyLevel: this.buyList.buyLevel,
	      BuyUrl: this.buyList.buyUrl,
	      BuyTime: this.buyList.buyTime,
	      BuyPrice : this.buyList.buyPrice,
	      BuyDesc : this.buyList.buyDesc,
        BuyState: this.buyList.buyState,
	      id:this.buyList.id
       });
		  }else{
		  }
	}, 
	(err) => {})
  }

  submitForm = ($event, value) => {
    console.log(1);
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
    this.isLoading = true;
    if(this.goBuy){
      value.buyState = 5;
    }
    if(this.notBuy){
      value.buyState = 4;
    }
    this.buyListService.Update(value)
        .subscribe((re: HttpResult)=>{
          this.isLoading = false;
          if (re.success) {
              this.nzMessage.success("保存成功");
          }else{
             this.nzMessage.error(re.err);
          }
        }, 
        (err) => {})
      }

    buy():void {
      this.goBuy = true;
    }

    dotBuy():void {
      this.notBuy = true;
    }
}
