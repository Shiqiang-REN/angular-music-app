import { NgModule } from '@angular/core';
import {HomeModule} from "./home/home.module";
import {PlaylistsModule} from "./playlists/playlists.module";
import {PlaylistDetailsModule} from "./playlist-details/playlist-details.module";
import {Error404Module} from "./error404/error404.module";
import {SongDetailsModule} from "./song-details/song-details.module";



@NgModule({
  declarations: [

  ],
  imports: [
    HomeModule,
    PlaylistsModule,
    PlaylistDetailsModule,
    SongDetailsModule,
    Error404Module
  ],
  exports: [
    HomeModule,
    PlaylistsModule,
    PlaylistDetailsModule,
    SongDetailsModule,
    Error404Module
  ]
})
export class PagesModule { }
