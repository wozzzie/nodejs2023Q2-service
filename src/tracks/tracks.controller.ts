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
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TracksService } from './tracks.service';
import { Track } from '../types/tracksInterface';
import { CreateTrackDto } from './dto/createTrackDto.dto';
import { UpdateTrackDto } from './dto/updateTrackDto.dto';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  async getAllTracks(): Promise<Track[]> {
    return this.tracksService.getAllTracks();
  }

  @Get(':trackId')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiParam({ name: 'trackId', type: String })
  async getTrackById(@Param('trackId') trackId: string): Promise<Track> {
    const track = this.tracksService.getTrackById(trackId);
    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED })
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
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
    this.tracksService.deleteTrack(trackId);
  }
}
