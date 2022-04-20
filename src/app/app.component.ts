import { Component } from '@angular/core';

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
}
