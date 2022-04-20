import {Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {SongPlaylist} from "../../../services/types/common.types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistComponent implements OnInit {
  @Input() SongPlaylist: SongPlaylist;
  @Output() onPlay = new EventEmitter<number>();
  constructor(
    private router:Router
  ) { }

  playPlaylist(id: number) {
    this.onPlay.emit(id);
  }

  goToPlaylistDetailsPage(id:number){
    this.router.navigate(['playlist', id])
  }


  get coverImg(): string {
    return this.SongPlaylist.picUrl || this.SongPlaylist.coverImgUrl;
  }

  ngOnInit(): void {

  }
}
