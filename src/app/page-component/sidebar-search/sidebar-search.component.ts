import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-search',
  templateUrl: './sidebar-search.component.html',
  styleUrls: ['./sidebar-search.component.css']
})
export class SidebarSearchComponent implements OnInit {

  item:{
    name:string;
    value:string;
  }
  @Input() list:item[] = [{name:"峨山扯过",value:"123"}]; 
  constructor() { }

  ngOnInit() {

  }

}
