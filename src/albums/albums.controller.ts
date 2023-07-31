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
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AlbumsService } from './albums.service';
import { CreateAlbumsDto } from './dto/createAlbumsDto.dto';
import { UpdateAlbumsDto } from './dto/updateAlbumsDto.dto';
import { Album } from '../types/albumsInterface';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, isArray: true })
  async getAllAlbums(): Promise<Album[]> {
    return this.albumsService.getAllAlbums();
  }

  @Get(':albumId')
  @ApiParam({ name: 'albumId', type: String })
  @ApiResponse({ status: HttpStatus.OK })
  async getAlbumById(@Param('albumId') albumId: string): Promise<Album> {
    const album = this.albumsService.getAlbumById(albumId);
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
    const updatedAlbum = this.albumsService.updateAlbum(
      albumId,
      updateAlbumDto,
    );
    return updatedAlbum;
  }

  @Delete(':albumId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'albumId', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteAlbum(@Param('albumId') albumId: string): Promise<void> {
    this.albumsService.deleteAlbum(albumId);
  }
}
