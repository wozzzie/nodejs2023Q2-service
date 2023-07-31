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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlbumsService } from './albums.service';
import { CreateAlbumsDto } from './dto/createAlbumsDto.dto';
import { UpdateAlbumsDto } from './dto/updateAlbumsDto.dto';
import { Album } from '../types/albumsInterface';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async getAllAlbums(): Promise<Album[]> {
    return this.albumsService.getAllAlbums();
  }

  @Get(':albumId')
  async getAlbumById(@Param('albumId') albumId: string): Promise<Album> {
    const album = this.albumsService.getAlbumById(albumId);
    return album;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(@Body() createAlbumDto: CreateAlbumsDto): Promise<Album> {
    const createdAlbum = this.albumsService.createAlbum(createAlbumDto);
    return createdAlbum;
  }

  @Put(':albumId')
  async updateAlbum(
    @Param('albumId') albumId: string,
    @Body() updateAlbumDto: UpdateAlbumsDto,
  ): Promise<Album> {
    const updatedAlbum = this.albumsService.updateAlbum(
      albumId,
      updateAlbumDto,
    );
    return updatedAlbum;
  }

  @Delete(':albumId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('albumId') albumId: string): Promise<void> {
    const deletedAlbum = this.albumsService.deleteAlbum(albumId);
    return deletedAlbum;
  }
}
