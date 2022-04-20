import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {getCurrentIndex, getCurrentSong, getPlayList, getSongList} from "../../../store/selectors/player.selectors";
import {PlayState} from "../../../store/reducers/player.reducer";
import {Song} from "../../../services/types/common.types";
import {SetCurrentIndex} from "../../../store/actions/player.actions";


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
    private store$: Store<{player:PlayState}>
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
    })
    appStore$.pipe(select(getCurrentSong)).subscribe(song => {
      if(song){
        this.currentSong = song
        this.duration = song.dt /1000
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
        this.playing = !this.playing;
        if (this.playing) {
          this.audioEl.play();
        }else {
          this.audioEl.pause();
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

  onPlay() {
    this.songReady = true
    this.play();
  }

  onTimeUpdate(e: Event) {
    this.currentTime = (<HTMLAudioElement>e.target).currentTime
    this.percent = (this.currentTime / this.duration) * 100;
    const buffered = this.audioEl.buffered;
    if (buffered.length && this.bufferPercent < 100) {
      this.bufferPercent = (buffered.end(0) / this.duration) * 100;
    }
  }

  private play() {
    this.audioEl.play()
    this.playing = true
  }

  get picUrl(): string {
    return this.currentSong ? this.currentSong.al.picUrl : '//s4.music.126.net/style/web2/img/default/default_album.jpg';
  }

  toggleListPanel() {
    this.showPanel = !this.showPanel;
  }


  ngOnInit(): void {
    this.audioEl = this.audio.nativeElement;
  }

}
