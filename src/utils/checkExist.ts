import { User } from 'src/types/usersInterface';
import {
  AlbumNotFoundException,
  ArtistNotFoundException,
  TrackNotFoundException,
  UserNotFoundException,
} from './exceptions';
import { Track } from 'src/types/tracksInterface';
import { Artist } from 'src/types/artistsInterface';
import { Album } from 'src/types/albumsInterface';

const checkUserExist = (user?: User): void => {
  if (!user) {
    throw new UserNotFoundException();
  }
};

const checkTrackExist = (track?: Track): void => {
  if (!track) {
    throw new TrackNotFoundException();
  }
};

const checkArtistExist = (artist?: Artist): void => {
  if (!artist) {
    throw new ArtistNotFoundException();
  }
};

const checkAlbumExist = (album?: Album): void => {
  if (!album) {
    throw new AlbumNotFoundException();
  }
};

export { checkUserExist, checkTrackExist, checkArtistExist, checkAlbumExist };
