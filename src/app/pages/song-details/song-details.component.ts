import { Component, OnInit } from '@angular/core';
import {Lyric, Song} from "../../services/types/common.types";
import {ActivatedRoute} from "@angular/router";
import {SongsService} from "../../services/songs.service";
import {first, forkJoin, Subject} from "rxjs";
import {select, Store} from "@ngrx/store";
import {getCurrentSong} from "../../store/selectors/player.selectors";
import {takeUntil} from "rxjs/operators";
import {PlayState} from "../../store/reducers/player.reducer";
import {ActionsService} from "../../store/actions.service";
import {NzMessageService} from "ng-zorro-antd/message";

type SongDataModel = [Song, Lyric]

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.less']
})

export class SongDetailsComponent implements OnInit {

  songId:string
  song:Song
  lyric:string
  currentSong: Song
  private destroy$ = new Subject<void>()

  constructor(
    private route: ActivatedRoute,
    private songsService: SongsService,
    private store$: Store<{player:PlayState}>,
    private actionsService: ActionsService,
    private message: NzMessageService
  ) {
    this.route.params.subscribe( params => {
      this.songId = params['id']
    })
    forkJoin([
      this.songsService.getSongDetail(this.songId),
      this.songsService.getLyric(Number(this.songId))
    ]).pipe(first())
      .subscribe(([song, lyric]) => {
        this.song = song
        // @ts-ignore
        this.lyric = lyric.lrc.lyric
    })
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


  ngOnInit(): void {
  }

}
