import { Injectable } from '@angular/core';
import {AppStoreModule} from "./app-store.module";
import {select, Store} from "@ngrx/store";
import {PlayState} from "./reducers/player.reducer";
import {Song} from "../services/types/common.types";
import {SetCurrentIndex, SetPlayList, SetSongList} from "./actions/player.actions";
import {findIndex} from "rxjs/operators";

@Injectable({
  providedIn: AppStoreModule
})
export class ActionsService {

  private playerState: PlayState

  constructor(
    private store$: Store<{player:PlayState}>
  ){
    this.store$.pipe(select('player')).subscribe(res => this.playerState = res)
  }

  //insert one song to the player playlist
  insertSong(song: Song, isPlay: boolean) {
    const songList = this.playerState.songList.slice();
    const playList = this.playerState.playList.slice();
    let insertIndex = this.playerState.currentIndex;
    // console.log('insertSong :', song);
    const pIndex = playList.findIndex(item => item.id === song.id )
    if (pIndex > -1) {
      // song already exit
      if (isPlay) {
        insertIndex = pIndex
      }
    }else {
      songList.push(song)
      playList.push(song)
      if (isPlay) {
        insertIndex = songList.length - 1
      }
      this.store$.dispatch(SetSongList({ songList }))
      this.store$.dispatch(SetPlayList({ playList }))
    }

    if (insertIndex !== this.playerState.currentIndex) {
      this.store$.dispatch(SetCurrentIndex({ currentIndex: insertIndex }))
    }
  }

  //insert all songs in the playlist to the player playlist
  insertSongs(songs: Song[]) {
    const songList = this.playerState.songList.slice();
    const playList = this.playerState.playList.slice();
    songs.forEach(song => {
      const pIndex = playList.findIndex(item => item.id === song.id )
      if (pIndex === -1) {
        songList.push(song);
        playList.push(song);
      }
    })
    this.store$.dispatch(SetSongList({ songList }))
    this.store$.dispatch(SetPlayList({ playList }))
  }

  //delete one song from the player playlist

  //delete all songs from the player playlist
  clearSongs() {
    this.store$.dispatch(SetSongList({ songList: [] }))
    this.store$.dispatch(SetPlayList({ playList: [] }))
    this.store$.dispatch(SetCurrentIndex({ currentIndex: -1 }))
  }
  //change the player playlist
  changePlayList({ list, index }: { list: Song[], index: number }) {


    this.store$.dispatch(SetSongList({ songList: list }))
    let trueIndex = index
    let trueList = list.slice()
    // if (this.playerState.playMode.type === 'random') {
    //   trueList = shuffle(list || []);
    //   trueIndex = findIndex(trueList, list[trueIndex]);
    // }
    this.store$.dispatch(SetPlayList({ playList: trueList }));
    this.store$.dispatch(SetCurrentIndex({ currentIndex: trueIndex }));
  }

}
