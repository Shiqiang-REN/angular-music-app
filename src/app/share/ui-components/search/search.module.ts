import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { SearchComponent } from './search.component';
import {NzInputModule} from "ng-zorro-antd/input";
import { PanelComponent } from './panel/panel.component';
import {FormsModule} from "@angular/forms";




@NgModule({
  declarations: [
    SearchComponent,
    PanelComponent
  ],
  entryComponents:[PanelComponent],
  imports: [
    CommonModule,
    NzInputModule,
    OverlayModule,
    FormsModule,
  ],
  exports:[
    SearchComponent
  ]
})
export class SearchModule { }
