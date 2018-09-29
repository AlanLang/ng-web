import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceIn } from 'ng-animate';

@Component({
  selector: 'app-chart-plan',
  templateUrl: './chart-plan.component.html',
  styleUrls: ['./chart-plan.component.css'],
    animations: [
    trigger('bounceIn', [transition('void => *', useAnimation(bounceIn))])
  ],
})
export class ChartPlanComponent implements OnInit {

  constructor() { }


option = {
        title:{
            text:'预算消耗',
            top:0,
            left:0
        },
    tooltip : {
        trigger: 'item',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
            left:0,
            right:0,
            bottom:0
    },
    xAxis:  {
        type: 'value',
        show:false
    },
    yAxis: {
        type: 'category',
        data: ['数量'],
        show:false
    },
    series: [
        {
            name: '已生产',
            type: 'bar',
            stack: '总量',
            barWidth:'18',
            itemStyle:{
              color:'#13c2c2',
            },
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [320]
        },
        {
            name: '未生产',
            type: 'bar',
            stack: '总量',
            itemStyle:{
              color:'#b9b1b1d9',
            },
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [800]
        }
    ]
};
  ngOnInit() {
  }

}
