import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {getCurrentIndex, getCurrentSong, getPlayList, getSongList} from "../../../store/selectors/player.selectors";
import {PlayState} from "../../../store/reducers/player.reducer";
import {Singer, Song} from "../../../services/types/common.types";
import {SetCurrentIndex} from "../../../store/actions/player.actions";
import {NzModalService} from "ng-zorro-antd/modal";
import {ActionsService} from "../../../store/actions.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {

  @ViewChild('audio', { static: true }) private audio: ElementRef
  private audioEl: HTMLAudioElement

  songList: Song[]
  playList: Song[]
  currentIndex: number
  currentSong: Song

  duration: number
  currentTime: number

  playing = false
  songReady = false

  percent = 0
  bufferPercent = 0

  showPanel = false

  constructor(
    private store$: Store<{player:PlayState}>,
    private nzModalService: NzModalService,
    private actionsService:ActionsService,
    private router: Router
  ) {
    const appStore$ = this.store$.pipe(select('player'))

    appStore$.pipe(select(getSongList)).subscribe(songList => {
      this.songList = songList
    })
    appStore$.pipe(select(getPlayList)).subscribe(playList => {
      this.playList = playList
    })
    appStore$.pipe(select(getCurrentIndex)).subscribe(index => {
      this.currentIndex = index
      console.log(this.currentIndex)
    })
    appStore$.pipe(select(getCurrentSong)).subscribe(song => {
      if(song){
        this.currentSong = song
        this.duration = song.dt /1000
      }else{
        // @ts-ignore
        this.currentSong = undefined
        this.duration = 0
        this.percent = 0
        this.bufferPercent = 0
      }
    })
  }

  // play/pause
  onToggle() {
    if (!this.currentSong) {
      if (this.playList.length) {
        this.store$.dispatch(SetCurrentIndex({ currentIndex: 0 }))
        this.songReady = false
      }
    }else {
      if (this.songReady) {
        this.playing = !this.playing
        if (this.playing) {
          this.audioEl.play()
        }else {
          this.audioEl.pause()
        }
      }
    }
  }


  // pre song
  onPrev(index: number) {
    if (!this.songReady) return;
    if (this.playList.length === 1) {
      this.loop();
    }else {
      const newIndex = index <= 0 ? this.playList.length - 1 : index;
      this.store$.dispatch(SetCurrentIndex({ currentIndex: newIndex}))
      this.songReady = false
    }
  }


  // next song
  onNext(index: number) {
    if (!this.songReady) return;
    if (this.playList.length === 1) {
      this.loop();
    }else {
      const newIndex = index >= this.playList.length ? 0 : index;
      this.store$.dispatch(SetCurrentIndex({ currentIndex: newIndex}))
      this.songReady = false
    }
  }

  // loop play
  private loop() {
    this.audioEl.currentTime = 0;
    this.play();
  }

  onEnded() {
    this.playing = false
    this.onNext(this.currentIndex + 1)

  }

  onPlay() {
    this.songReady = true
    this.play();
  }

  onTimeUpdate(e: Event) {
    this.currentTime = (<HTMLAudioElement>e.target).currentTime
    this.percent = (this.currentTime / this.duration) * 100
    const buffered = this.audioEl.buffered;
    if (buffered.length && this.bufferPercent < 100) {
      this.bufferPercent = (buffered.end(0) / this.duration) * 100
    }
  }

  private play() {
    this.audioEl.play()
    this.playing = true
  }

  get picUrl(): string {
    return this.currentSong ? this.currentSong.al.picUrl : '//s4.music.126.net/style/web2/img/default/default_album.jpg'
  }

  toggleListPanel() {
    this.showPanel = !this.showPanel;
  }


  //delete a song from playlist
  onDeleteSong(song: Song) {
    this.actionsService.deleteSong(song)
  }

  //clear playlist
  onClearSong() {
    this.nzModalService.confirm({
      nzTitle: 'Do you want to clear the playlist ?',
      nzOnOk: () => {
        this.actionsService.clearSongs()
      }
    })
  }

  //to song detail page
  toInfo(path: [string, number]) {
    console.log('toInfo :', path)
    if (path[1]) {
      this.showPanel = false
      this.router.navigate(path)
    }
  }


  ngOnInit(): void {
    this.audioEl = this.audio.nativeElement;
  }

}
