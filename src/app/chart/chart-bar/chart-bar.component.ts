import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceIn } from 'ng-animate';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.css'],
    animations: [
    trigger('bounceIn', [transition('void => *', useAnimation(bounceIn))])
  ],
})
export class ChartBarComponent implements OnInit {

  constructor() { }

  option = {
    title:{
	    text:'良品率',
	    top:0,
	    left:0
    },
    grid:{
        left:0,
        right:0,
        bottom:0
    },
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'line'
        }
    },
    xAxis: {
        type: 'category',
        show:false,
        data: ['2018-07-20','2018-07-21','2018-07-22','2018-07-23', '2018-07-24', '2018-07-25', '2018-07-26', '2018-07-27', '2018-07-28', '2018-07-29']
    },
    yAxis: {
        show:false,
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130,120,130,150],
        type: 'bar',
        color:'#1890ff',
    }]
};

  ngOnInit() {
  }

}
