import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { UserCreat,UserPageServiceProxy,HttpResult } from '@shared/service-proxies/user-proxies'
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { Router} from '@angular/router'; //导入router服务
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
	validateForm: FormGroup;
  isLoading = false;
  
  confirmValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };
  constructor(private fb: FormBuilder, 
    private userPageServiceProxy:UserPageServiceProxy,
    private nzMessage: NzMessageService,
    private router: Router,
    private nzModal: NzModalService
    ) { 
  		this.validateForm = this.fb.group({
      userName: [ '', [ Validators.required]],
      surname: [ '', [ Validators.required ]],
      name: [ '', [ Validators.required ]],
      emailAddress: [ '', [ Validators.email ]],
      password: [ '', [ Validators.required ] ],
      confirm : [ '', [ this.confirmValidator ] ],
    });
  }

  ngOnInit() {
  }
  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
    this.isLoading = true;
    this.userPageServiceProxy.create(value)
        .subscribe((re: HttpResult)=>{
          this.isLoading = false;
          if (re.success) {
              //this.nzMessage.success("添加成功");
              this.nzModal.confirm({
                nzTitle     : '用户添加成功',
                nzContent   : '是否跳转到审批人分配页面',
                nzOnOk      : () => this.router.navigateByUrl(`/page/useredit/${re.result.id}`)
              });
          }else{
             this.nzMessage.error(re.error.message);
          }
        }, 
        (err) => {
          this.isLoading = false;
          this.nzMessage.error(err.error.error.message);
        })
      }
}
