import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from 'src/types/favoritesInterface';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favsService: FavoritesService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  async getAllFavorites(): Promise<FavoritesResponse> {
    return this.favsService.getAllFavs();
  }

  @Post('/track/:trackId')
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({ name: 'trackId', type: String })
  async addTrackToFavorites(@Param('trackId') trackId: string): Promise<void> {
    this.favsService.addFavTrack(trackId);
  }

  @Delete('/track/:trackId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'trackId', type: String })
  async deleteFavoriteTrack(@Param('trackId') trackId: string): Promise<void> {
    this.favsService.deleteFavTrack(trackId);
  }

  @Post('/album/:albumId')
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({ name: 'albumId', type: String })
  async addAlbumToFavorites(@Param('albumId') albumId: string): Promise<void> {
    this.favsService.addFavAlbum(albumId);
  }

  @Delete('/album/:albumId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'albumId', type: String })
  async deleteFavoriteAlbum(@Param('albumId') albumId: string): Promise<void> {
    this.favsService.deleteFavAlbum(albumId);
  }

  @Post('/artist/:artistId')
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({ name: 'artistId', type: String })
  async addArtistToFavorites(
    @Param('artistId') artistId: string,
  ): Promise<void> {
    this.favsService.addFavArtist(artistId);
  }

  @Delete('/artist/:artistId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'artistId', type: String })
  async deleteFavoriteArtist(
    @Param('artistId') artistId: string,
  ): Promise<void> {
    this.favsService.deleteFavArtist(artistId);
  }
}
