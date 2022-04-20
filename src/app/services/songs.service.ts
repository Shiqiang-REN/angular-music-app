import { Injectable } from '@angular/core';
import {ServicesModule} from "./service.module";
import {SongPlaylist, SongUrl, Song, Lyric} from './types/common.types';
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
    return this.http.get<{ data: SongUrl[] }>('http://3.25.87.188:3000/song/url', { params })
      .pipe(map(res => res.data))
  }


  getSongList(songs: Song | Song[]): Observable<Song[]> {
    console.log(songs)
    const songArr = Array.isArray(songs) ? songs.slice() : [songs];
    const ids = songArr.map(item => item.id).join(',');
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

  getSongDetail(ids: string): Observable<Song> {
    const params = new HttpParams().set('ids', ids);
    return this.http.get<{songs: Song[]}>('http://3.25.87.188:3000/song/detail', { params })
      .pipe(map(res => res.songs[0]));
  }

  getLyric(id: number): Observable<Lyric> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get('http://3.25.87.188:3000/lyric', { params }).pipe(map(res => res as Lyric));
  }

}
