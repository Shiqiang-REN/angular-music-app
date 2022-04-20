import { Component, OnInit } from '@angular/core';
import { HomeService} from "../../services/home.service";
import {Banner, HotTag, SongPlaylist, Singer} from "../../services/types/common.types";
import {SingersService} from "../../services/singers.service";
import {PlaylistsService} from "../../services/playlists.service";
import {AppStoreModule} from "../../store/app-store.module";
import {Store} from "@ngrx/store";
import {SetCurrentIndex, SetPlayList, SetSongList} from "../../store/actions/player.actions";
import {PlayState} from "../../store/reducers/player.reducer";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  banners: Banner[]
  hotTags: HotTag[]
  songPlaylists: SongPlaylist[]
  singers: Singer[]

  constructor(
    private homeService: HomeService,
    private singerService:SingersService,
    private playlistsService: PlaylistsService,
    private store$: Store<{player:PlayState}>
  ) {
    this.getBanners()
    this.getHotTags()
    this.getPersonalizedSheetList()
    this.getSingers()
  }
  private getBanners() {
    this.homeService.getBanners().subscribe(banners => {
      this.banners = banners
    })
  }
  private getHotTags() {
    this.homeService.getHotTags().subscribe(tags => {
      this.hotTags = tags
    })
  }

  private getPersonalizedSheetList() {
    this.homeService.getPersonalSongPlaylist().subscribe(playlists => {
      this.songPlaylists = playlists
    })
  }

  private getSingers() {
    this.singerService.getSingers().subscribe(singers => {
      this.singers = singers
    })
  }

  onPlayPlaylist(id: number) {
    console.log('id :', id);
    this.playlistsService.playPlayList(id).subscribe(res => {
      this.store$.dispatch(SetSongList({ songList: res }))
      this.store$.dispatch(SetPlayList({ playList: res }))
      this.store$.dispatch(SetCurrentIndex({ currentIndex: 0 }))
    })
  }

  ngOnInit(): void {
  }

}
