import ALBUMS_DB from 'src/db/albums.db';
import { v4 as uuidv4 } from 'uuid';
import getValidUuid from 'src/utils/checkValidation';
import { BadRequestException, Injectable } from '@nestjs/common';
import { findAlbum } from 'src/utils/checkAppropriate';
import { checkAlbumExist } from 'src/utils/checkExist';
import { CreateAlbumsDto } from './dto/createAlbumsDto.dto';
import { deleteAppropriateAlbum } from 'src/utils/deleteAppropriate';
import { UpdateAlbumsDto } from './dto/updateAlbumsDto.dto';
import { Album } from 'src/types/albumsInterface';
import TRACKS_DB from 'src/db/tracks.db';
import { Track } from 'src/types/tracksInterface';

@Injectable()
export class AlbumsService {
  getAllAlbums(): Album[] {
    return ALBUMS_DB;
  }

  getAlbumById(id: string): Album {
    getValidUuid(id);
    const album = findAlbum(id);
    checkAlbumExist(album);
    return album;
  }

  createAlbum(createAlbumsDto: CreateAlbumsDto): Album {
    const { name, year, artistId } = createAlbumsDto;

    if (
      (name && year === undefined) ||
      typeof name !== 'string' ||
      typeof year !== 'number'
    ) {
      throw new BadRequestException('Name, year, artistId are required');
    }

    const newAlbum: Album = {
      id: uuidv4(),
      name,
      year,
      artistId: artistId ?? null,
    };

    ALBUMS_DB.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, updateAlbumsDto: UpdateAlbumsDto) {
    const { name, year, artistId } = updateAlbumsDto;
    getValidUuid(id);

    if (
      (name && year === undefined) ||
      typeof name !== 'string' ||
      typeof year !== 'number'
    ) {
      throw new BadRequestException('Name, year, artistId are required');
    }

    const album = findAlbum(id);
    checkAlbumExist(album);

    album.name = name;
    album.year = year;
    album.artistId = artistId ?? null;
    return album;
  }

  deleteAlbum(id: string): void {
    getValidUuid(id);
    const album = findAlbum(id);
    checkAlbumExist(album);

    TRACKS_DB.forEach((track: Track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    deleteAppropriateAlbum(album);
  }
}
