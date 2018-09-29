import { Component, OnInit,Input } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceIn } from 'ng-animate';

@Component({
  selector: 'app-chart-wave-line',
  templateUrl: './chart-wave-line.component.html',
  styleUrls: ['./chart-wave-line.component.css'],
    animations: [
    trigger('bounceIn', [transition('void => *', useAnimation(bounceIn))])
  ],
})
export class ChartWaveLineComponent implements OnInit {
  @Input() chartTitle:string = "标题";
  @Input() chartText:string = "解释";
  @Input() chartData:number[];
  @Input() chartColor:string;

  constructor() { }
    option = {
        title:{
            text:this.chartTitle,
            top:0,
            left:0
        },
        grid:{
            left:0,
            right:0,
            bottom:0
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            show:false,
            data: ['2018-07-21', '2018-07-22', '2018-07-23', '2018-07-24', '2018-07-25', '2018-07-26', '2018-07-27']
        },
        yAxis: {
            type: 'value',
            show:false
        },
        series: [{
            data: [20, 25, 30, 50, 30, 20, 40],
            type: 'line',
            smooth:true,
            showSymbol:false,
            color:'#975FE4',
            areaStyle: {
                normal: {}
            },
        }]
    };
  ngOnInit() {
      this.option.title.text = this.chartTitle;
      this.option.series[0].data = this.chartData;
      this.option.series[0].color = this.chartColor;
  }

}
