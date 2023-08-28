import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { TrackService } from '../tracks/tracks.service';
import { AlbumService } from '../albums/albums.service';
import { ArtistService } from '../artists/artists.service';
import { StatusCodes } from 'http-status-codes';
import getValidUuid from 'src/utils/checkValidation';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAllFavorites() {
    return this.favoritesService.findAllFavorites();
  }

  @Post('track/:id')
  async addTrackToFavorites(@Param('id') id: string) {
    getValidUuid(id);

    const track = await this.favoritesService.addTrackToFavorites(id);
    if (!track) {
      throw new HttpException(
        'Unprocessable entity',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    return track;
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoriteTrack(@Param('id') id: string) {
    getValidUuid(id);
    const track = await this.favoritesService.deleteTrackFromFavorites(id);
    return track;
  }

  @Post('album/:id')
  async addAlbumToFavorites(@Param('id') id: string) {
    getValidUuid(id);

    const album = await this.favoritesService.addAlbumToFavorites(id);
    if (!album) {
      throw new HttpException(
        'Unprocessable entity',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    return album;
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoriteAlbum(@Param('id') id: string) {
    getValidUuid(id);
    const album = await this.favoritesService.deleteAlbumFromFavorites(id);
    return album;
  }

  @Post('artist/:id')
  async addArtistToFavorites(@Param('id') id: string) {
    getValidUuid(id);

    const artist = await this.favoritesService.addArtistToFavorites(id);
    if (!artist) {
      throw new HttpException(
        'Unprocessable entity',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    return artist;
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoriteArtist(@Param('id') id: string) {
    getValidUuid(id);

    const artist = await this.favoritesService.deleteArtistFromFavorites(id);
    return artist;
  }
}
