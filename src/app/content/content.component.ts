import { Component, OnInit, Input,HostListener } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
	@Input() isCollapsed = true;
  nzLeft = 200;
  nzClose = 80;
  nzOpen = 200;
  constructor() { }
  
  ngOnInit() {

  }

  onCollapsedChange(isCollapsed: boolean):void {
    this.isCollapsed = isCollapsed;
    console.log(isCollapsed);
    this.nzLeft = this.isCollapsed?this.nzOpen:this.nzClose;
  }

  @HostListener('window:resize', [ '$event' ])
  onWindowResize(e: UIEvent): void {
    // if (e.target.innerWidth < 800) {
    //   this.nzLeft = this.nzClose;
    //   this.isCollapsed = false;
    // }else{
    //   this.nzLeft = this.nzOpen;
    //   this.isCollapsed = true;
    // }
  }
}
