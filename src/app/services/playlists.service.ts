import { Injectable } from '@angular/core';
import {ServicesModule} from "./service.module";
import {Song, SongPlaylist} from "./types/common.types";
import {Observable, pluck, switchMap} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {SongsService} from "./songs.service";

@Injectable({
  providedIn: ServicesModule
})
export class PlaylistsService {

  constructor(
    private http: HttpClient,
    private songsService: SongsService
  ) { }

  getSongPlaylistDetail(id: number): Observable<Song[]> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<{songs: Song[]}>('http://localhost:3000/playlist/track/all', { params })
      .pipe(map(res => res.songs));
  }


  playPlayList(id: number): Observable<Song[]> {
    return this.getSongPlaylistDetail(id)
      .pipe(switchMap(res => this.songsService.getSongList(res)));
  }
}
