import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzInputModule} from "ng-zorro-antd/input";
import {UiComponentsModule} from "./ui-components/ui-components.module";

@NgModule({
  imports: [
    CommonModule,
    NzButtonModule,
    NzLayoutModule,
    NzDropDownModule,
    NzInputModule,
    UiComponentsModule,
  ],
  exports: [
    NzButtonModule,
    NzLayoutModule,
    NzDropDownModule,
    NzInputModule,
    UiComponentsModule,
  ],

})
export class ShareModule { }
