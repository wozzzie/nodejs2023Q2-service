import { User } from 'src/types/usersInterface';
import {
  ArtistNotFoundException,
  TrackNotFoundException,
  UserNotFoundException,
} from './exceptions';
import { Track } from 'src/types/tracksInterface';
import { Artist } from 'src/types/artistsInterface';

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

export { checkUserExist, checkTrackExist, checkArtistExist };
