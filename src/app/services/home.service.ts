import { Injectable } from '@angular/core';
import {Banner, HotTag, SongPlaylist} from "./types/common.types";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {ServicesModule} from "./service.module";

@Injectable({
  providedIn: ServicesModule
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getBanners(): Observable<Banner[]> {
    return this.http.get<{ banners: Banner[] }>( 'http://3.25.87.188:3000/banner')
      .pipe(map(res => res.banners))
  }

  getHotTags(): Observable<HotTag[]> {
    return this.http.get<{ tags: HotTag[] }>('http://3.25.87.188:3000/playlist/hot')
      .pipe(map(res => {
        return res.tags.sort((x: HotTag, y: HotTag) => x.position - y.position).slice(0, 5)
      }));
  }


  getPersonalSongPlaylist(): Observable<SongPlaylist[]> {
    return this.http.get<{ result: SongPlaylist[] }>('http://3.25.87.188:3000/personalized')
      .pipe(map(res => res.result.slice(0, 16)))
  }


}
