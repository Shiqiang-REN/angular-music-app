import {Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {SongPlaylist} from "../../../services/types/common.types";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistComponent implements OnInit {
  @Input() SongPlaylist: SongPlaylist;
  @Output() onPlay = new EventEmitter<number>();
  constructor() { }

  playPlaylist(id: number) {
    this.onPlay.emit(id);
  }

  ngOnInit(): void {

  }
}
