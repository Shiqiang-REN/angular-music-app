import { Component, OnInit } from '@angular/core';
import {PlaylistParams, PlaylistsService} from "../../services/playlists.service";
import {Playlists, SongPlaylist} from "../../services/types/common.types";
import {ActivatedRoute} from "@angular/router";
import {SetCurrentIndex, SetPlayList, SetSongList} from "../../store/actions/player.actions";
import {Store} from "@ngrx/store";
import {PlayState} from "../../store/reducers/player.reducer";

@Component({
  selector: 'app-palylists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.less']
})
export class PlaylistsComponent implements OnInit {

  playlistParams: PlaylistParams = {
    cat: '全部',
    order: 'hot',
    offset: 1,
    limit: 35
  }
  playlists: Playlists
  orderValue = 'hot'

  constructor(
    private route: ActivatedRoute,
    private playlistsService: PlaylistsService,
    private store$: Store<{player:PlayState}>
  ) {
    this.playlistParams.cat = this.route.snapshot.queryParamMap.get('cat') || '全部'
    this.getPlaylists();
  }

  private getPlaylists() {
    this.playlistsService.getPlaylists(this.playlistParams).subscribe(playlists => this.playlists = playlists);
  }

  onPlayPlaylist(id: number) {
    console.log(id)
    this.playlistsService.playPlayList(id).subscribe(res => {
      this.store$.dispatch(SetSongList({ songList: res }))
      this.store$.dispatch(SetPlayList({ playList: res }))
      this.store$.dispatch(SetCurrentIndex({ currentIndex: 0 }))
    })
  }

  onOrderValue(order: 'new' | 'hot'){
    this.playlistParams.order = order
    this.playlistParams.offset = 1
    this.getPlaylists()
  }

  onPageChange(page: number) {
    this.playlistParams.offset = page;
    this.getPlaylists()
  }


  ngOnInit(): void {
  }

}
