import getValidUuid from 'src/utils/checkValidation';
import { Injectable } from '@nestjs/common';
import {
  findAlbum,
  findArtist,
  findInFavs,
  findTrack,
} from 'src/utils/checkAppropriate';
import {
  checkAlbumCorrespond,
  checkAlbumExist,
  checkArtistCorrespond,
  checkArtistExist,
  checkTrackCorrespond,
  checkTrackExist,
} from 'src/utils/checkExist';
import { deleteAppropriateFav } from 'src/utils/deleteAppropriate';
import { Album } from 'src/types/albumsInterface';
import { Track } from 'src/types/tracksInterface';
import { FavoritesResponse } from 'src/types/favoritesInterface';
import FAVORITES_DB from 'src/db/favorites.db';
import { Artist } from 'src/types/artistsInterface';

@Injectable()
export class FavoritesService {
  getAllFavs(): FavoritesResponse {
    return FAVORITES_DB;
  }

  addFavTrack(id: string): void {
    getValidUuid(id);
    const track = findTrack(id);
    checkTrackCorrespond(track);

    FAVORITES_DB.tracks.push(track);
  }

  deleteFavTrack(id: string): void {
    getValidUuid(id);
    const track = findTrack(id);
    checkTrackExist(track);

    const favTrack = findInFavs(id, 'Track') as Track;
    deleteAppropriateFav('Track', favTrack);
  }

  addFavAlbum(id: string): void {
    getValidUuid(id);
    const album = findAlbum(id);
    checkAlbumCorrespond(album);
    FAVORITES_DB.albums.push(album);
  }

  deleteFavAlbum(id: string): void {
    getValidUuid(id);
    const album = findAlbum(id);
    checkAlbumExist(album);

    const favAlbum = findInFavs(id, 'Album') as Album;
    deleteAppropriateFav('Album', favAlbum);
  }

  addFavArtist(id: string): void {
    getValidUuid(id);
    const artist = findArtist(id);
    checkArtistCorrespond(artist);
    FAVORITES_DB.artists.push(artist);
  }

  deleteFavArtist(id: string): void {
    getValidUuid(id);
    const artist = findArtist(id);
    checkArtistExist(artist);

    const favArtist = findInFavs(id, 'Artist') as Artist;
    deleteAppropriateFav('Artist', favArtist);
  }
}
