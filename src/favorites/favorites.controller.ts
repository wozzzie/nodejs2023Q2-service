import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favsService: FavoritesService) {}

  @Get()
  async getAllFavorites() {
    return this.favsService.getAllFavs();
  }

  @Post('/track/:trackId')
  @HttpCode(HttpStatus.CREATED)
  async addTrackToFavorites(@Param('trackId') trackId: string): Promise<void> {
    const addedTrack = this.favsService.addFavTrack(trackId);
    return addedTrack;
  }

  @Delete('/track/:trackId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoriteTrack(@Param('trackId') trackId: string): Promise<void> {
    const deletedTrack = this.favsService.deleteFavTrack(trackId);
    return deletedTrack;
  }

  @Post('/album/:albumId')
  @HttpCode(HttpStatus.CREATED)
  async addAlbumToFavorites(@Param('albumId') albumId: string): Promise<void> {
    const addedAlbum = this.favsService.addFavAlbum(albumId);
    return addedAlbum;
  }

  @Delete('/album/:albumId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoriteAlbum(@Param('albumId') albumId: string): Promise<void> {
    const deletedAlbum = this.favsService.deleteFavAlbum(albumId);
    return deletedAlbum;
  }

  @Post('/artist/:artistId')
  @HttpCode(HttpStatus.CREATED)
  async addArtistToFavorites(
    @Param('artistId') artistId: string,
  ): Promise<void> {
    const addedArtist = this.favsService.addFavArtist(artistId);
    return addedArtist;
  }

  @Delete('/artist/:artistId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoriteArtist(
    @Param('artistId') artistId: string,
  ): Promise<void> {
    const deletedArtist = this.favsService.deleteFavArtist(artistId);
    return deletedArtist;
  }
}
