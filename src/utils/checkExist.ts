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
import { UserEntity } from 'src/users/entities/user.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';

const checkUserExist = (user?: UserEntity): void => {
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

const checkAlbumExist = (album?: AlbumEntity): void => {
  if (!album) {
    throw new AlbumNotFoundException();
  }
};

export {
  checkUserExist,
  checkTrackExist,
  checkArtistExist,
  checkAlbumExist,
  checkTrackCorrespond,
  checkAlbumCorrespond,
  checkArtistCorrespond,
};
