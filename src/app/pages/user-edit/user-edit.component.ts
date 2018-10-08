import { Component, OnInit } from '@angular/core';
import { CreateApprover,PageUserSearch,UserResult,UserPageServiceProxy,HttpResult,PageUserResult } from '@shared/service-proxies/user-proxies'
import { NzMessageService } from 'ng-zorro-antd';
import {ActivatedRoute,Params} from '@angular/router';
import { Router} from '@angular/router'; //导入router服务
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id = 0;
  ApproverValue: number[];
  userResult :UserResult;
  validateForm: FormGroup;
  searchForm: FormGroup;
  createApprover : CreateApprover = {
    userId:0,
    approverId:0
  };
  isLoading = false;
  searchLoading = false;
  approverLoading = false;
  changePwdLoading = false;

  optionList = [];

  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];

  searchItem :PageUserSearch = {
    UserName:'',
    SkipCount:0,
    MaxResultCount:10
  };

  confirmValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.searchForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  validateConfirmPassword(): void {
    setTimeout(() => this.searchForm.controls.confirm.updateValueAndValidity());
  }

  constructor(private nzMessage: NzMessageService,
  	private userPageService: UserPageServiceProxy,
    private fb: FormBuilder,
    private router: Router,
  	private route: ActivatedRoute
  	) { 
      this.validateForm = this.fb.group({
        userName: [ '', [ Validators.required ]],
        surname: [ '', [ Validators.required ]],
        name: [ '', [ Validators.required ]],
        emailAddress: [ '', [ Validators.email ]],
        id:""
      });
      this.searchForm = this.fb.group({
      password: [ '', [ Validators.required ] ],
      confirm : [ '', [ this.confirmValidator ] ],
      id:""
      });
  }



  ngOnInit() {
  	this.id = this.route.snapshot.params['id'];
    this.getUser(this.id);
    this.onSearch("");
    this.getApprover();
  }

  getUser(id: number): void {
    this.isLoading = true;
  	this.userPageService.get(id)
        .subscribe((re: HttpResult)=>{
          this.isLoading =false;
          if (re.success) {
             this.userResult = re.result;
             this.validateForm.setValue({
               userName:this.userResult.userName,
                surname: this.userResult.surname,
                name: this.userResult.name,
                emailAddress: this.userResult.emailAddress,
                id:this.userResult.id
             });
             this.searchForm.setValue({
                id:this.userResult.id,
                password:"",
                confirm:""
             });
          }else{
             this.nzMessage.error(re.error.message);
          }
        }, 
        (err) => {
          this.isLoading =false;
          this.nzMessage.error(err);
        })
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
    this.isLoading = true;
    this.userPageService.update(value)
        .subscribe((re: HttpResult)=>{
          this.isLoading = false;
          if (re.success) {
              this.nzMessage.success("修改成功");
              //this.validateForm.reset();
          }else{
             this.nzMessage.error(re.error.message);
          }
        }, 
        (err) => {
          this.isLoading = false;
        })
      }
  submitSearchForm = ($event, value) =>{
    $event.preventDefault();
    for (const key in this.searchForm.controls) {
      this.searchForm.controls[ key ].markAsDirty();
      this.searchForm.controls[ key ].updateValueAndValidity();
    }
    this.searchLoading = true;
    this.userPageService.updatePwd(value)
    .subscribe((re: HttpResult)=>{
      this.searchLoading = false;
      console.log(re);
      if (re.success) {
          this.nzMessage.success("修改成功");
      }else{
         this.nzMessage.error(re.error.message);
      }
    }, 
    (err) => {
      this.searchLoading = false;
    })
  }
  onSearch(value: string): void {
    this.searchItem.UserName = value;
    this.searchLoading = true;
    this.userPageService
    .getAll(value)
    .subscribe((re: PageUserResult)=>{
      this.searchLoading = false;
      this.optionList = re.items;
    }, 
    (err) => {
      this.searchLoading = false;
    })
  }

  onAddApprover(): void {
    this.createApprover.userId = this.id;
    for(let item of this.ApproverValue){
      this.createApprover.approverId = item;
      this.oncreateApprover(this.createApprover);
    }
  }

  approverDelete(id: number): void{
    this.approverLoading = true;
    this.userPageService.removeApprovers(this.id,id)
    .subscribe((re:HttpResult) => {
      this.getApprover();
    },(err)=>{
      this.approverLoading = true;
    })
  }

  userClose():void {
    this.nzMessage.error("此功能正在开发，请稍后");
  }

  userDelete():void {
    const index = this.nzMessage.loading("用户正在删除").messageId;
    this.userPageService.delete(this.id)
    .subscribe((re:HttpResult) =>{
      this.nzMessage.remove(index);
      this.nzMessage.info("用户删除成功");
      this.router.navigateByUrl("/page/user");
    },(err)=>{
      this.nzMessage.error(err.error.message);
      this.nzMessage.remove(index);
    })
  }
  private getApprover(): void {
    this.userPageService.getApprovers(this.id)
    .subscribe((re:HttpResult) => {
      this.data = re.result.items
      this.approverLoading = false;
    },(err)=>{
      this.nzMessage.error(err.error.message);
      this.approverLoading = false;
    })
  }

  private oncreateApprover(model: CreateApprover): void{
    this.approverLoading = true;
    this.userPageService.setApprovers(model)
    .subscribe(re => {
      this.ApproverValue = null;
      this.approverLoading = false;
      this.getApprover();
    },(err)=>{
      this.nzMessage.error(err.error.message);
      this.approverLoading = false;
    })
  } 
}


