import { Injectable } from '@angular/core';
import {ServicesModule} from "./service.module";
import {Playlists, Song, SongPlaylist} from "./types/common.types";
import {Observable, pluck, switchMap} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {SongsService} from "./songs.service";
import * as queryString from "query-string";

export type PlaylistParams = {
  offset: number;
  limit: number;
  order: 'new' | 'hot',
  cat: string;
}

@Injectable({
  providedIn: ServicesModule
})
export class PlaylistsService {

  constructor(
    private http: HttpClient,
    private songsService: SongsService
  ) { }

  getPlaylistDetail(id: number): Observable<SongPlaylist> {
    console.log(id)
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<{playlist: SongPlaylist}>('http://3.25.87.188:3000/playlist/detail', { params })
      .pipe(map(res => res.playlist
      ))
  }


  playPlayList(id: number): Observable<Song[]> {
    return this.getPlaylistDetail(id)
      .pipe(pluck('tracks'), switchMap(tracks => this.songsService.getSongList(tracks)
      ))
  }

  getPlaylists(args: PlaylistParams): Observable<Playlists> {
    const params = new HttpParams({ fromString: queryString.stringify(args) });
    return this.http.get( 'http://3.25.87.188:3000/top/playlist', { params }).pipe(map(res => res as Playlists));
  }
}
