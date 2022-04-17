import { NgModule } from '@angular/core';
import { PlaylistComponent } from './playlist/playlist.component';
import {PlayCountPipe} from "../pipes/play-count.pipe";
import {PlayerModule} from "./player/player.module";




@NgModule({
  declarations: [
    PlaylistComponent,
    PlayCountPipe
  ],
  imports: [
    PlayerModule,
  ],
  exports: [
    PlaylistComponent,
    PlayerModule,
    PlayCountPipe
  ]
})
export class UiComponentsModule { }
