import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TrackEntity } from './entities/track.entity';
import { CreateTrackDto } from './dto/createTrackDto.dto';
import { UpdateTrackDto } from './dto/updateTrackDto.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { checkTrackExist } from 'src/utils/checkExist';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  getAllTracks(): Promise<TrackEntity[]> {
    return this.trackRepository.find();
  }

  async getTrackById(id: string): Promise<TrackEntity | null> {
    const track = await this.trackRepository.findOneBy({ id });
    checkTrackExist(track);
    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    const { name, duration } = createTrackDto;

    const newTrack = this.trackRepository.create({
      name,
      duration,
      isFavorite: false,
    });

    return await this.trackRepository.save(newTrack);
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const { name, duration } = updateTrackDto;
    const track = await this.trackRepository.findOneBy({
      id,
    });

    checkTrackExist(track);
    return await this.trackRepository.save({
      id,
      isFavorite: track.isFavorite,
      name,
      duration,
    });
  }

  async deleteTrack(id: string) {
    const track = await this.trackRepository.findOneBy({
      id,
    });
    checkTrackExist(track);

    await this.trackRepository.delete(id);
  }
}
