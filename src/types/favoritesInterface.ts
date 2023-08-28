import { Album } from './albumsInterface';
import { Artist } from './artistsInterface';
import { Track } from './tracksInterface';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
