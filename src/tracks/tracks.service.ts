import { BadRequestException, Injectable } from '@nestjs/common';
import { Track } from '../types/tracksInterface';
import TRACKS_DB from 'src/db/tracks.db';
import { CreateTrackDto } from './dto/createTrackDto.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from './dto/updateTrackDto.dto';
import getValidUuid from 'src/utils/checkValidation';
import { checkTrackExist } from 'src/utils/checkExist';
import { findTrack } from 'src/utils/checkAppropriate';
import {
  deleteAppropriateFav,
  deleteAppropriateTrack,
} from 'src/utils/deleteAppropriate';

@Injectable()
export class TracksService {
  getAllTracks(): Track[] {
    return TRACKS_DB;
  }

  getTrackById(id: string): Track {
    getValidUuid(id);
    const track = findTrack(id);
    checkTrackExist(track);
    return track;
  }

  createTrack(createTrackDto: CreateTrackDto): Track {
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

    const newTrack: Track = {
      id: uuidv4(),
      name,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
      duration,
    };

    TRACKS_DB.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto): Track {
    const { name, artistId, albumId, duration } = updateTrackDto;

    getValidUuid(id);

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

    const track = findTrack(id);
    checkTrackExist(track);

    track.name = name;
    track.artistId = artistId ?? null;
    track.albumId = albumId ?? null;
    track.duration = duration;
    return { ...track };
  }

  deleteTrack(id: string): void {
    getValidUuid(id);
    const track = findTrack(id);
    checkTrackExist(track);
    deleteAppropriateTrack(track);
    deleteAppropriateFav('Track', track as Track);
  }
}
