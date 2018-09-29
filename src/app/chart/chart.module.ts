import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartWaveLineComponent } from './chart-wave-line/chart-wave-line.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartBarComponent } from './chart-bar/chart-bar.component';
import { ChartPlanComponent } from './chart-plan/chart-plan.component';


@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  declarations: [ChartWaveLineComponent, ChartBarComponent, ChartPlanComponent],
  exports:[ChartWaveLineComponent,ChartBarComponent,ChartPlanComponent]
})
export class ChartModule { }
