import ARTISTS_DB from 'src/db/artists.db';
import TRACKS_DB from 'src/db/tracks.db';
import USERS_DB from 'src/db/users.db';
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

export {
  deleteAppropriateUser,
  deleteAppropriateTrack,
  deleteAppropriateArtist,
};
