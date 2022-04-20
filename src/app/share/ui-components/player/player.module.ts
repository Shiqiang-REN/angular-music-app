import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import {SliderModule} from "../slider/slider.module";
import {FormatTimePipe} from "../../pipes/format-time.pipe";
import {FormsModule} from "@angular/forms";
import { PlaylistsModalComponent } from './playlists-modal/playlists-modal.component';



@NgModule({
  declarations: [
    PlayerComponent,
    FormatTimePipe,
    PlaylistsModalComponent
  ],
  imports: [
    CommonModule,
    SliderModule,
    FormsModule
  ],
  exports: [
    PlayerComponent,
    FormatTimePipe
  ]
})
export class PlayerModule { }
