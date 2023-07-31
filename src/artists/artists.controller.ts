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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/createArtistDto.dto';
import { UpdateArtistDto } from './dto/updateArtistDto.dto';
import { Artist } from '../types/artistsInterface';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async getAllArtists(): Promise<Artist[]> {
    return this.artistsService.getAllArtists();
  }

  @Get(':artistId')
  async getArtistById(@Param('artistId') artistId: string): Promise<Artist> {
    const artist = this.artistsService.getArtistById(artistId);
    return artist;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    const createdArtist = this.artistsService.createArtist(createArtistDto);
    return createdArtist;
  }

  @Put(':artistId')
  async updateArtist(
    @Param('artistId') artistId: string,
    @Body() updateArtisDto: UpdateArtistDto,
  ): Promise<Artist> {
    const updatedArtist = this.artistsService.updateArtist(
      artistId,
      updateArtisDto,
    );
    return updatedArtist;
  }

  @Delete(':artistId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('artistId') artistId: string): Promise<void> {
    const deletedArtist = this.artistsService.deleteArtist(artistId);
    return deletedArtist;
  }
}
