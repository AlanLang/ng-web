import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  animations: [
    trigger('fadeIn', [transition('void => *', useAnimation(fadeIn,{
      params: { timing: 0.5, delay: 0 }
    }))])
  ],
})
export class SearchPageComponent implements OnInit {
fadeIn: any;
  constructor() { }

  ngOnInit() {
  }

}
