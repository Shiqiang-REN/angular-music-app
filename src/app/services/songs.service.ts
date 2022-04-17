import { Injectable } from '@angular/core';
import {ServicesModule} from "./service.module";
import { SongPlaylist, SongUrl, Song } from './types/common.types';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";


@Injectable({
  providedIn: ServicesModule
})
export class SongsService {

  constructor(private http: HttpClient) { }

  getSongUrl(ids: string): Observable<SongUrl[]> {
    const params = new HttpParams().set('id', ids)
    return this.http.get<{ data: SongUrl[] }>('http://localhost:3000/song/url', { params })
      .pipe(map(res => res.data))
  }


  getSongList(songs: Song | Song[]): Observable<Song[]> {
    const songArr = Array.isArray(songs) ? songs.slice() : [songs];
    const ids = songArr.map(item => item.id).join(',');
    console.log(ids)
    return this.getSongUrl(ids).pipe(map(urls => this.generateSongList(songArr, urls)));
  }


  private generateSongList(songs: Song[], urls: SongUrl[]): Song[] {
    const result:Song[] = []
    songs.forEach(song => {
      // @ts-ignore
      const url = urls.find(url => url.id === song.id).url
      if (url) {
        result.push({ ...song, url })
      }
    })
    return result
  }
}
