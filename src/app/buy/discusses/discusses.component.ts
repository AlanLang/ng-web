import { Component, OnInit, Input } from '@angular/core';
import { CreatDisscuesDto,BuyListServiceProxy,DisscuesDto,HttpResult } from '@shared/service-proxies/buy-proxies'
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-discusses',
  templateUrl: './discusses.component.html',
  styleUrls: ['./discusses.component.css']
})
export class DiscussesComponent implements OnInit {

	data: DisscuesDto[] = [];
  listLoading = false;
  discusses = "";
  isAgree = false;
  @Input() id = 0;
  creatDisscuesDto: CreatDisscuesDto;
  constructor(
    private buyService: BuyListServiceProxy,
    private nzMessage: NzMessageService) { }

  ngOnInit() {
    this.getDisscues(this.id);
  }
  onCommitDis(isAgree: boolean):void {
    this.creatDisscuesDto = {
      buyListId:this.id,
      discuss:this.discusses,
      isAgree:isAgree
    }
    this.creatDisscues(this.creatDisscuesDto);
  }

  creatDisscues(model: CreatDisscuesDto): void {
    this.listLoading = true;
    this.buyService.CreatDisscues(model)
    .subscribe((re: HttpResult)=>{
    this.listLoading = false;
    if (re.success) {
      this.nzMessage.success("评论提交成功");
      this.discusses = "";
      this.getDisscues(this.id);
    }else{
     this.nzMessage.error(re.err);
    }
    }, 
    (err) => {
      this.nzMessage.error(err.error.error.message);
    })
  }

  getDisscues(id: number):void {
    this.listLoading = true;
    this.buyService.GetDisscues(id)
    .subscribe((re: HttpResult)=>{
    this.listLoading = false;
    if (re.success) {
      this.data = re.result.items;
      for (let item of this.data) {
        if (item.isAgree) {
          this.isAgree = true;
        }
      }
    }else{
     this.nzMessage.error(re.err);
    }
    }, 
    (err) => {
      this.nzMessage.error(err.error.error.message);
    })
  }

}
