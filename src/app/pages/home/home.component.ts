import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  array = [ '欢迎使用Angular', 2, 3, 4 ];
  ProductData = [20, 25, 30, 50, 30, 20, 40];
  personData = [56, 55, 56, 57, 54, 55, 56];
  constructor() { }

  ngOnInit() {
  }

}
