import { Component } from '@angular/core';
import {SearchService} from "./services/search.service";
import {SearchResult} from "./services/types/common.types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'angular_music_app'
  menu = [{
    label: 'Browse',
    path: '/home'
  }, {
    label: 'Playlists',
    path: '/playlists'
  }]

  searchResult: SearchResult

  constructor(
    private searchService:SearchService
  ) {
  }

  onSearch(keywords: string) {
    // console.log('keywords :', keywords);
    if (keywords) {
      this.searchService.search(keywords).subscribe(res => {
        this.searchResult = res
      })
    }else {
      this.searchResult = {}
    }
  }



}
