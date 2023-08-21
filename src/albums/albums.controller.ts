import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AlbumService } from './albums.service';
import { CreateAlbumsDto } from './dto/createAlbumsDto.dto';
import { UpdateAlbumsDto } from './dto/updateAlbumsDto.dto';
import { Album } from '../types/albumsInterface';
import getValidUuid from 'src/utils/checkValidation';
import { checkAlbumCorrespond, checkAlbumExist } from 'src/utils/checkExist';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, isArray: true })
  async getAllAlbums(): Promise<Album[]> {
    return this.albumsService.getAllAlbums();
  }

  @Get(':albumId')
  @ApiParam({ name: 'albumId', type: String })
  @ApiResponse({ status: HttpStatus.OK })
  async getAlbumById(@Param('albumId') albumId: string): Promise<Album> {
    getValidUuid(albumId);
    const album = await this.albumsService.getAlbumById(albumId);
    checkAlbumCorrespond(album);
    return album;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateAlbumsDto })
  @ApiResponse({ status: HttpStatus.CREATED })
  async createAlbum(@Body() createAlbumDto: CreateAlbumsDto): Promise<Album> {
    const createdAlbum = this.albumsService.createAlbum(createAlbumDto);
    return createdAlbum;
  }

  @Put(':albumId')
  @ApiParam({ name: 'albumId', type: String })
  @ApiBody({ type: UpdateAlbumsDto })
  @ApiResponse({ status: HttpStatus.OK })
  async updateAlbum(
    @Param('albumId') albumId: string,
    @Body() updateAlbumDto: UpdateAlbumsDto,
  ): Promise<Album> {
    getValidUuid(albumId);
    const { name, year } = updateAlbumDto;
    const album = await this.albumsService.getAlbumById(albumId);

    checkAlbumExist(album);
    if (
      (name && year === undefined) ||
      typeof name !== 'string' ||
      typeof year !== 'number'
    ) {
      throw new BadRequestException('Name, year, artistId are required');
    }
    return await this.albumsService.updateAlbum(albumId, updateAlbumDto);
  }

  @Delete(':albumId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'albumId', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteAlbum(@Param('albumId') albumId: string) {
    getValidUuid(albumId);
    const album = await this.albumsService.getAlbumById(albumId);
    checkAlbumExist(album);
    return await this.albumsService.deleteAlbum(albumId);
  }
}
