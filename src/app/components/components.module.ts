import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';

import {BaseChartDirective} from 'ng2-charts'
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BaseChartDirective
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent
  ],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class ComponentsModule { }
