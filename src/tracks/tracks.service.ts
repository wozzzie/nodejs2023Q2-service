import { BadRequestException, Injectable } from '@nestjs/common';
import { Track } from '../types/tracksInterface';
import { CreateTrackDto } from './dto/createTrackDto.dto';
import { UpdateTrackDto } from './dto/updateTrackDto.dto';
import { checkTrackExist } from 'src/utils/checkExist';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getAllTracks(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  async getTrackById(id: string): Promise<Track> {
    const track = await this.trackRepository.findOneBy({ id });
    checkTrackExist(track);
    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
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

    const newTrack = this.trackRepository.create({
      name,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
      duration,
    });

    await this.trackRepository.save(newTrack);
    return newTrack;
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const { name, artistId, albumId, duration } = updateTrackDto;

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

    const track = await this.getTrackById(id);

    track.name = name;
    track.artistId = artistId ?? null;
    track.albumId = albumId ?? null;
    track.duration = duration;

    await this.trackRepository.save(track);
    return track;
  }

  async deleteTrack(id: string): Promise<void> {
    const track = await this.getTrackById(id);
    await this.trackRepository.delete(track);
  }
}
