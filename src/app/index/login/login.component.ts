import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { LoginService } from './login.service';
import { Router} from '@angular/router'; //导入router服务
import { HttpAuthenticateResultModel} from '@shared/service-proxies/service-proxies';


import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
	isLoading = false;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private loginService: LoginService,
    private router: Router
    ) {
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.status == "VALID") {
  		this.isLoading = true;
      // 登录
      this.loginService.authenticateModel.userNameOrEmailAddress = this.validateForm.value.userName;
      this.loginService.authenticateModel.password = this.validateForm.value.password;
      this.loginService.authenticateModel.rememberClient = this.validateForm.value.remember
      this.loginService.login(
        (err:HttpAuthenticateResultModel) => this.onLogInResult(err)
      );
    }
  }

  onLogInResult(re :HttpAuthenticateResultModel): void {
    this.isLoading = false;
    if (re.success) {
      this.router.navigateByUrl("/buy/home");
    }else{
      this.message.error(re.err);
    }
  }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
  }

  ngHelp(): void {
    this.message.info('此页面正在开发，请稍后。');
  }

}
