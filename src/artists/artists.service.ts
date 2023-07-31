import ARTISTS_DB from 'src/db/artists.db';
import { Artist } from '../types/artistsInterface';
import { v4 as uuidv4 } from 'uuid';
import getValidUuid from 'src/utils/checkValidation';
import { BadRequestException, Injectable } from '@nestjs/common';
import { findArtist } from 'src/utils/checkAppropriate';
import { checkArtistExist } from 'src/utils/checkExist';
import { CreateArtistDto } from './dto/createArtistDto.dto';
import { deleteAppropriateArtist } from 'src/utils/deleteAppropriate';
import { UpdateArtistDto } from './dto/updateArtistDto.dto';
import TRACKS_DB from 'src/db/tracks.db';
import { Track } from 'src/types/tracksInterface';
import { Album } from 'src/types/albumsInterface';
import ALBUMS_DB from 'src/db/albums.db';

@Injectable()
export class ArtistsService {
  getAllArtists(): Artist[] {
    return ARTISTS_DB;
  }

  getArtistById(id: string): Artist {
    getValidUuid(id);
    const artist = findArtist(id);
    checkArtistExist(artist);
    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto): Artist {
    const { name, grammy } = createArtistDto;

    if (
      !name ||
      typeof name !== 'string' ||
      grammy === undefined ||
      typeof grammy !== 'boolean'
    ) {
      throw new BadRequestException('Name, grammy are required');
    }

    const newArtist: Artist = {
      id: uuidv4(),
      name,
      grammy,
    };

    ARTISTS_DB.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const { name, grammy } = updateArtistDto;

    getValidUuid(id);
    if (
      !name ||
      typeof name !== 'string' ||
      grammy === undefined ||
      typeof grammy !== 'boolean'
    ) {
      throw new BadRequestException('Name, grammy are required');
    }

    const artist = findArtist(id);
    checkArtistExist(artist);

    artist.name = name;
    artist.grammy = grammy;
    return artist;
  }

  deleteArtist(id: string): void {
    getValidUuid(id);
    const artist = findArtist(id);
    checkArtistExist(artist);

    TRACKS_DB.forEach((track: Track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    ALBUMS_DB.forEach((album: Album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
    deleteAppropriateArtist(artist);
    // this.favoritesService.removeTrackFromFavorites(id);
  }
}
