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
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TrackService } from './tracks.service';
import { Track } from '../types/tracksInterface';
import { CreateTrackDto } from './dto/createTrackDto.dto';
import { UpdateTrackDto } from './dto/updateTrackDto.dto';
import getValidUuid from 'src/utils/checkValidation';
import { checkTrackExist } from 'src/utils/checkExist';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TrackService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  async getAllTracks(): Promise<Track[]> {
    return this.tracksService.getAllTracks();
  }

  @Get(':trackId')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiParam({ name: 'trackId', type: String })
  async getTrackById(@Param('trackId') trackId: string): Promise<Track> {
    getValidUuid(trackId);

    const track = await this.tracksService.getTrackById(trackId);

    checkTrackExist(track);
    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED })
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    const { name, artistId, albumId, duration } = createTrackDto;
    if (
      !name ||
      typeof name !== 'string' ||
      (artistId !== null && typeof artistId !== 'string') ||
      (albumId !== null && typeof albumId !== 'string') ||
      typeof duration !== 'number'
    ) {
      throw new BadRequestException(
        'Name, artistId, albumId, and duration are required and must be of the correct type',
      );
    }
    const createdTrack = this.tracksService.createTrack(createTrackDto);
    return createdTrack;
  }

  @Put(':trackId')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiParam({ name: 'trackId', type: String })
  async updateTrack(
    @Param('trackId') trackId: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    getValidUuid(trackId);

    const { name, artistId, albumId, duration } = updateTrackDto;

    const track = await this.tracksService.getTrackById(trackId);
    checkTrackExist(track);

    if (
      !name ||
      typeof name !== 'string' ||
      (artistId !== null &&
        typeof artistId !== 'string' &&
        typeof artistId !== 'undefined') ||
      (albumId !== null &&
        typeof albumId !== 'string' &&
        typeof albumId !== 'undefined') ||
      typeof duration !== 'number'
    ) {
      throw new BadRequestException(
        'Name, artistId, albumId, and duration are required and must be of the correct type',
      );
    }
    const updatedTrack = this.tracksService.updateTrack(
      trackId,
      updateTrackDto,
    );
    return updatedTrack;
  }

  @Delete(':trackId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'trackId', type: String })
  async deleteTrack(@Param('trackId') trackId: string): Promise<void> {
    getValidUuid(trackId);

    const track = await this.tracksService.getTrackById(trackId);
    checkTrackExist(track);
    this.tracksService.deleteTrack(trackId);
  }
}
