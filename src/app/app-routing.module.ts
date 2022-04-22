import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {PlaylistsComponent} from "./pages/playlists/playlists.component";
import {Error404Component} from "./pages/error404/error404.component";
import {PlaylistDetailsComponent} from "./pages/playlist-details/playlist-details.component";
import {SongDetailsComponent} from "./pages/song-details/song-details.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: 'Browse' } },
  { path: 'playlists', component: PlaylistsComponent, data: { title: 'Playlists' } },
  { path: 'playlist/:id', component: PlaylistDetailsComponent, data: { title: 'Playlist' } },
  { path: 'song/:id', component: SongDetailsComponent, data: { title: 'Song' } },
  { path: 'error', component: Error404Component, data: { title: 'error' } },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
