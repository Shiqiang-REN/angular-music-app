import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Song} from "../../../../services/types/common.types";
import {SongsService} from "../../../../services/songs.service";
import {Store} from "@ngrx/store";
import {PlayState} from "../../../../store/reducers/player.reducer";
import {SetCurrentIndex} from "../../../../store/actions/player.actions";

@Component({
  selector: 'app-playlists-modal',
  templateUrl: './playlists-modal.component.html',
  styleUrls: ['./playlists-modal.component.less']
})
export class PlaylistsModalComponent implements OnInit, OnChanges {
  @Input() songList: Song[]
  @Input() currentSong: Song
  @Input() currentIndex: number
  @Input() show: boolean = true

  @Output() onClose = new EventEmitter<void>()
  @Output() onChangeSong = new EventEmitter<Song>()
  @Output() onDeleteSong = new EventEmitter<Song>()
  @Output() onClearSong = new EventEmitter<void>()
  @Output() toInfo = new EventEmitter<[string, number]>()

  lyric:string

  constructor(
    private store$: Store<{player:PlayState}>,
    private songsService: SongsService
  ) { }

  ngOnInit() {
  }

  //detect @input changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['songList']) {


    }
    if (changes['currentSong']) {
      if(this.currentSong)this.updateLyric()
      else this.lyric = ''
    }

  }

  private updateLyric() {
    this.songsService.getLyric(this.currentSong.id).subscribe(lyric => {
      // @ts-ignore
      this.lyric = lyric.lrc.lyric
    })
  }

  private updateCurrentIndex() {
    this.currentIndex = this.songList.findIndex(item => item.id === this.currentSong.id)
  }
}
