import ARTISTS_DB from 'src/db/artists.db';
import TRACKS_DB from 'src/db/tracks.db';
import USERS_DB from 'src/db/users.db';
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

export { findUser, findTrack, findArtist };
