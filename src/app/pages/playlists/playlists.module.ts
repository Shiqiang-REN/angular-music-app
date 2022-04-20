import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists.component';
import {ShareModule} from "../../share/share.module";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    PlaylistsComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    NzRadioModule,
    NzPaginationModule,
    FormsModule,
  ]
})
export class PlaylistsModule { }
