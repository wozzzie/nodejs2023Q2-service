import { User } from 'src/types/usersInterface';
import { TrackNotFoundException, UserNotFoundException } from './exceptions';
import { Track } from 'src/types/tracksInterface';

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

export { checkUserExist, checkTrackExist };
