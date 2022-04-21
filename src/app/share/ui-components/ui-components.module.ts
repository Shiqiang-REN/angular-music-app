import { NgModule } from '@angular/core';
import { PlaylistComponent } from './playlist/playlist.component';
import {PlayCountPipe} from "../pipes/play-count.pipe";
import {PlayerModule} from "./player/player.module";
import {SearchModule} from "./search/search.module";




@NgModule({
  declarations: [
    PlaylistComponent,
    PlayCountPipe
  ],
  imports: [
    PlayerModule,
    SearchModule
  ],
  exports: [
    PlaylistComponent,
    PlayerModule,
    SearchModule,
    PlayCountPipe
  ]
})
export class UiComponentsModule { }
