export type Banner = {
  targetId: number;
  url: string;
  imageUrl: string;
}

export type HotTag = {
  id: number;
  name: string;
  position: number;
}

export type SongPlaylist = {
  id: number;
  name: string;
  userId: number;
  picUrl: string;
  coverImgUrl:string;
  tags:string[];
  playCount: number;
  createTime: number;
  creator: { nickname: string; avatarUrl: string; };
  description: string;
  subscribedCount: number;
  shareCount: number;
  commentCount: number;
  subscribed: boolean;
  tracks: Song[];
}

export type Singer = {
  id: number;
  name: string;
  picUrl: string;
  albumSize: number;
}

export type Song = {
  id: number;
  name: string;
  url: string;
  ar: Singer[];
  al: { id: number; name: string; picUrl: string };
  dt: number;
}

export type SongUrl = {
  id: number;
  url: string;
}

export type Lyric = {
  lrc: string;
  tlyric: string;
}

export type Playlists = {
  playlists: SongPlaylist[];
  total: number;
}
