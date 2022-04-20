import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistDetailsComponent } from './playlist-details.component';
import {ShareModule} from "../../share/share.module";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzIconModule} from "ng-zorro-antd/icon";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    PlaylistDetailsComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    NzTagModule,
    NzTableModule,
    NzIconModule,
    RouterModule,
  ],
  providers:[{provide:NzMessageService}]
})
export class PlaylistDetailsModule { }
