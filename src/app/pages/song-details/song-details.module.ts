import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShareModule} from "../../share/share.module";
import { SongDetailsComponent } from './song-details.component';
import {NzIconModule} from "ng-zorro-antd/icon";



@NgModule({
  declarations: [
    SongDetailsComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    NzIconModule,
  ]
})
export class SongDetailsModule { }
