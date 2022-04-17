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
  picUrl: string;
  playCount: number;
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