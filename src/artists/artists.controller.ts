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
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ArtistService } from './artists.service';
import { CreateArtistDto } from './dto/createArtistDto.dto';
import { UpdateArtistDto } from './dto/updateArtistDto.dto';
import { Artist } from '../types/artistsInterface';
import { checkArtistExist } from 'src/utils/checkExist';
import { StatusCodes } from 'http-status-codes';
import getValidUuid from 'src/utils/checkValidation';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, isArray: true })
  async getAllArtists(): Promise<Artist[]> {
    return this.artistsService.getAllArtists();
  }

  @Get(':artistId')
  @ApiParam({ name: 'artistId', type: String })
  @ApiResponse({ status: HttpStatus.OK })
  async getArtistById(@Param('artistId') artistId: string): Promise<Artist> {
    getValidUuid(artistId);
    const artist = await this.artistsService.getArtistById(artistId);
    if (!artist) {
      throw new HttpException(
        'Unprocessable entity',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
    return artist;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateArtistDto })
  @ApiResponse({ status: HttpStatus.CREATED })
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    const createdArtist = this.artistsService.createArtist(createArtistDto);
    return createdArtist;
  }

  @Put(':artistId')
  @ApiParam({ name: 'artistId', type: String })
  @ApiBody({ type: UpdateArtistDto })
  @ApiResponse({ status: HttpStatus.OK })
  async updateArtist(
    @Param('artistId') artistId: string,
    @Body() updateArtisDto: UpdateArtistDto,
  ): Promise<Artist> {
    getValidUuid(artistId);
    const artist = await this.artistsService.getArtistById(artistId);
    checkArtistExist(artist);

    const updatedArtist = await this.artistsService.updateArtist(
      artistId,
      updateArtisDto,
    );
    return updatedArtist;
  }

  @Delete(':artistId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'artistId', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteArtist(@Param('artistId') artistId: string): Promise<void> {
    getValidUuid(artistId);
    const artist = await this.getArtistById(artistId);
    checkArtistExist(artist);
    this.artistsService.deleteArtist(artistId);
  }
}
