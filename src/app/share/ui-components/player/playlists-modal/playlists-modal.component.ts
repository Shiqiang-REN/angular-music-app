import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Song} from "../../../../services/types/common.types";
import {SongsService} from "../../../../services/songs.service";

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

  lyric:string

  constructor(
    private songsService: SongsService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['songList']) {
      // console.log('songList :', this.songList)
    }
    if (changes['currentSong']) {
      this.updateLyric()
      // console.log('currentSong :', this.currentSong)
    }

  }

  private updateLyric() {
    this.songsService.getLyric(this.currentSong.id).subscribe(lyric => {
      // @ts-ignore
      this.lyric = lyric.lrc.lyric
      console.log(this.lyric)
    });
  }
}
