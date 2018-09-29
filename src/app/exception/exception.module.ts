import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NopermissionComponent } from './nopermission/nopermission.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NopermissionComponent],
  exports:[
	  NopermissionComponent
  ],
})
export class ExceptionModule { }
