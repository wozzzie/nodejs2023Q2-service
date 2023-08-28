import { Artist } from '../types/artistsInterface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { checkArtistExist } from 'src/utils/checkExist';
import { CreateArtistDto } from './dto/createArtistDto.dto';
import { UpdateArtistDto } from './dto/updateArtistDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAllArtists(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  async getArtistById(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });
    checkArtistExist(artist);
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const { name, grammy } = createArtistDto;

    if (
      !name ||
      typeof name !== 'string' ||
      grammy === undefined ||
      typeof grammy !== 'boolean'
    ) {
      throw new BadRequestException('Name and Grammy are required');
    }

    const newArtist = this.artistRepository.create({
      name,
      grammy,
    });

    await this.artistRepository.save(newArtist);
    return newArtist;
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const { name, grammy } = updateArtistDto;

    const artist = await this.getArtistById(id);

    if (
      !name ||
      typeof name !== 'string' ||
      grammy === undefined ||
      typeof grammy !== 'boolean'
    ) {
      throw new BadRequestException('Name and Grammy are required');
    }

    artist.name = name;
    artist.grammy = grammy;

    await this.artistRepository.save(artist);
    return artist;
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = await this.getArtistById(id);

    await this.artistRepository.delete(artist);

    // TRACKS_DB.forEach((track: Track) => {
    //   if (track.artistId === id) {
    //     track.artistId = null;
    //   }
    // });

    // ALBUMS_DB.forEach((album: Album) => {
    //   if (album.artistId === id) {
    //     album.artistId = null;
    //   }
    // });
    // deleteAppropriateArtist(artist);
    // deleteAppropriateFav('Artist', artist as Artist);
  }
}
