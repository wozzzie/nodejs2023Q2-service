import ALBUMS_DB from 'src/db/albums.db';
import ARTISTS_DB from 'src/db/artists.db';
import FAVORITES_DB from 'src/db/favorites.db';
import TRACKS_DB from 'src/db/tracks.db';
import USERS_DB from 'src/db/users.db';
import { Album } from 'src/types/albumsInterface';
import { Artist } from 'src/types/artistsInterface';
import { Track } from 'src/types/tracksInterface';
import { User } from 'src/types/usersInterface';

const deleteAppropriateUser = (user: User): void => {
  const index = USERS_DB.indexOf(user);
  USERS_DB.splice(index, 1);
};

const deleteAppropriateTrack = (track: Track): void => {
  const index = TRACKS_DB.indexOf(track);
  TRACKS_DB.splice(index, 1);
};

const deleteAppropriateArtist = (artist: Artist): void => {
  const index = ARTISTS_DB.indexOf(artist);
  ARTISTS_DB.splice(index, 1);
};

const deleteAppropriateAlbum = (album: Album): void => {
  const index = ALBUMS_DB.indexOf(album);
  ALBUMS_DB.splice(index, 1);
};

const deleteAppropriateFav = (
  type: Artist | Album | Track,
  entity: Artist | Album | Track,
) => {
  if (type === (type as Artist)) {
    const index = FAVORITES_DB.artists.indexOf(entity as Artist);
    FAVORITES_DB.artists.splice(index, 1);
  } else if (type === (type as Album)) {
    const index = FAVORITES_DB.albums.indexOf(entity as Album);
    FAVORITES_DB.albums.splice(index, 1);
  } else if (type === (type as Track)) {
    const index = FAVORITES_DB.tracks.indexOf(entity as Track);
    FAVORITES_DB.tracks.splice(index, 1);
  } else {
    throw new Error('Invalid type');
  }
};

export {
  deleteAppropriateUser,
  deleteAppropriateTrack,
  deleteAppropriateArtist,
  deleteAppropriateAlbum,
  deleteAppropriateFav,
};
