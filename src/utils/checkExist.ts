import { User } from 'src/types/usersInterface';
import {
  AlbumNotCorrespondExeption,
  AlbumNotFoundException,
  ArtistNotCorrespondExeption,
  ArtistNotFoundException,
  TrackNotCorrespondExeption,
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

const checkTrackCorrespond = (track?: Track): void => {
  if (!track) {
    throw new TrackNotCorrespondExeption();
  }
};

const checkAlbumCorrespond = (album?: Album): void => {
  if (!album) {
    throw new AlbumNotCorrespondExeption();
  }
};

const checkArtistCorrespond = (artist?: Artist): void => {
  if (!artist) {
    throw new ArtistNotCorrespondExeption();
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

const checkFavExist = (entity: Artist | Album | Track): void => {
  if (!entity) {
    if (entity === (entity as Artist)) {
      throw new ArtistNotFoundException();
    } else if (entity === (entity as Album)) {
      throw new AlbumNotFoundException();
    } else if (entity === (entity as Track)) {
      throw new TrackNotFoundException();
    }
  }
};
export {
  checkUserExist,
  checkTrackExist,
  checkArtistExist,
  checkAlbumExist,
  checkTrackCorrespond,
  checkFavExist,
  checkAlbumCorrespond,
  checkArtistCorrespond,
};
