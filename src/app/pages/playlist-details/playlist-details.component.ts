import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlaylistsService} from "../../services/playlists.service";
import {findIndex, map, takeUntil} from "rxjs/operators";
import {Song, SongPlaylist} from "../../services/types/common.types";
import {select, Store} from "@ngrx/store";
import {SongsService} from "../../services/songs.service";
import {Subject} from "rxjs";
import {PlayState} from "../../store/reducers/player.reducer";
import {getCurrentSong} from "../../store/selectors/player.selectors";
import {ActionsService} from "../../store/actions.service";
import {NzMessageService} from "ng-zorro-antd/message";


@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.less']
})
export class PlaylistDetailsComponent implements OnInit, OnDestroy {

  songPlaylist: SongPlaylist;
  playlistId: number;

  description = {
    short: '',
    long: ''
  }

  currentSong: Song
  currentIndex = -1
  private destroy$ = new Subject<void>()
  private playerState: PlayState

  constructor(
    private route: ActivatedRoute,
    private playlistsService: PlaylistsService,
    private songsService: SongsService,
    private store$: Store<{player:PlayState}>,
    private actionsService: ActionsService,
    private message: NzMessageService
  ) {
    this.route.params.subscribe( params => {
      this.playlistId = params['id']
    })
    this.playlistsService.getPlaylistDetail(this.playlistId)
      .pipe(map(res => res)).subscribe(res => {
      // console.log(res)
      this.songPlaylist = res;
    })

    this.listenCurrent()
  }

  private listenCurrent() {
    this.store$
      .pipe(select('player'), select(getCurrentSong), takeUntil(this.destroy$))
      .subscribe(song => {
        // console.log('song :', song);
        this.currentSong = song;
        // if (song) {
        //   this.currentIndex = findIndex(this.songPlaylist.tracks, song);
        // }else {
        //   this.currentIndex = -1;
        // }
      })
  }


  onAddSong(song: Song, isPlay = false) {
    if (!this.currentSong || this.currentSong.id !== song.id) {
      this.songsService.getSongList(song)
        .subscribe(list => {
          if (list.length) {
            this.actionsService.insertSong(list[0], isPlay);
          }else {
            this.message.warning('Can not play! NO copyright!');
          }
          // console.log(list)
        })
    }
  }

  onAddSongs(songs: Song[], isPlay = false) {
    this.songsService.getSongList(songs).subscribe(list => {
      if (list.length) {
        if (isPlay) {
          this.actionsService.changePlayList({ list, index: 0 });
        }else {
          this.actionsService.insertSongs(list);
        }
      }
    });
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
