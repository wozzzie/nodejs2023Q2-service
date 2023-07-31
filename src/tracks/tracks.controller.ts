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
import { TracksService } from './tracks.service';
import { Track } from '../types/tracksInterface';
import { CreateTrackDto } from './dto/createTrackDto.dto';
import { UpdateTrackDto } from './dto/updateTrackDto.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async getAllTracks(): Promise<Track[]> {
    return this.tracksService.getAllTracks();
  }

  @Get(':trackId')
  async getTrackById(@Param('trackId') trackId: string): Promise<Track> {
    const track = this.tracksService.getTrackById(trackId);
    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    const createdTrack = this.tracksService.createTrack(createTrackDto);
    return createdTrack;
  }

  @Put(':trackId')
  async updateTrack(
    @Param('trackId') trackId: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const updatedTrack = this.tracksService.updateTrack(
      trackId,
      updateTrackDto,
    );
    return updatedTrack;
  }

  @Delete(':trackId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('trackId') trackId: string): Promise<void> {
    const deletedTrack = this.tracksService.deleteTrack(trackId);
    return deletedTrack;
  }
}
