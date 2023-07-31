import ALBUMS_DB from 'src/db/albums.db';
import ARTISTS_DB from 'src/db/artists.db';
import FAVORITES_DB from 'src/db/favorites.db';
import TRACKS_DB from 'src/db/tracks.db';
import USERS_DB from 'src/db/users.db';
import { Album } from 'src/types/albumsInterface';
import { Artist } from 'src/types/artistsInterface';
import { Track } from 'src/types/tracksInterface';
import { User } from 'src/types/usersInterface';

const findUser = (id: string): User => {
  return USERS_DB.find((user: User) => user.id === id);
};

const findTrack = (id: string): Track => {
  return TRACKS_DB.find((track: Track) => track.id === id);
};

const findArtist = (id: string): Artist => {
  return ARTISTS_DB.find((artist: Artist) => artist.id === id);
};

const findAlbum = (id: string): Album => {
  return ALBUMS_DB.find((album: Album) => album.id === id);
};

const findInFavs = (id: string, type: 'Artist' | 'Album' | 'Track') => {
  if (type === 'Artist') {
    return FAVORITES_DB.artists.find((entity) => entity.id === id);
  } else if (type === 'Album') {
    return FAVORITES_DB.albums.find((entity) => entity.id === id);
  } else if (type === 'Track') {
    return FAVORITES_DB.tracks.find((entity) => entity.id === id);
  } else {
    throw new Error('Invalid type');
  }
};

export { findUser, findTrack, findArtist, findAlbum, findInFavs };
