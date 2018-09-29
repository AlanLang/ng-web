import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { CreatBuyListDto,BuyListServiceProxy,HttpResult } from '@shared/service-proxies/buy-proxies'
import { NzMessageService } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-buyadd',
  templateUrl: './buyadd.component.html',
  styleUrls: ['./buyadd.component.css']
})


export class BuyaddComponent implements OnInit {
  validateForm: FormGroup;
  isSmall = false;
  isLoading = false;
  constructor(private fb: FormBuilder,
    private buyListServiceProxy: BuyListServiceProxy,
    private nzMessage: NzMessageService) { 
  	this.validateForm = this.fb.group({
        BuyName: [ '', [ Validators.required ]],
        BuyTypeName   : [ '', [ Validators.required ] ],
        BuyLevel: [ '', [ Validators.required ] ],
        BuyUrl: [ '', [ Validators.required ] ],
        BuyTime: [ '', [ Validators.required ] ],
        BuyPrice : [ '', [ this.confirmValidator ] ],
        BuyDesc : [ '', [] ]
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
      this.configWidth();
     this.validateForm.reset();
     Observable.fromEvent(window, 'resize') 
     .debounceTime(100) 
     .subscribe((event) => { 
       this.configWidth();
     }); 
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
    this.isLoading = true;
    this.buyListServiceProxy.Create(value)
        .subscribe((re: HttpResult)=>{
          this.isLoading = false;
          if (re.success) {
              this.nzMessage.success("添加成功");
              this.validateForm.reset();
          }else{
             this.nzMessage.error(re.err);
          }
        }, 
        (err) => {})
      }

  configWidth() { 
    if (window.innerWidth < 400) {
      this.isSmall = true;
    }else{
      this.isSmall = false;
    }
  } 
}
