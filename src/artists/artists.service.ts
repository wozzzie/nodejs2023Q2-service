import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { UpdateArtistDto } from './dto/updateArtistDto.dto';
import { CreateArtistDto } from './dto/createArtistDto.dto';
import { checkArtistExist } from '../utils/checkExist';
import getValidUuid from '../utils/checkValidation';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  getAllArtists(): Promise<ArtistEntity[]> {
    return this.artistRepository.find();
  }

  async getArtistById(id: string): Promise<ArtistEntity | null> {
    getValidUuid(id);
    const artist = await this.artistRepository.findOneBy({ id });
    checkArtistExist(artist);
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const { name, grammy } = createArtistDto;

    if (
      !name ||
      typeof name !== 'string' ||
      grammy === undefined ||
      typeof grammy !== 'boolean'
    ) {
      throw new BadRequestException('Name, grammy are required');
    }
    const newArtist = this.artistRepository.create({
      name,
      grammy,
      isFavorite: false,
    });
    return await this.artistRepository.save(newArtist);
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    getValidUuid(id);

    const { name, grammy } = updateArtistDto;
    if (
      !name ||
      typeof name !== 'string' ||
      grammy === undefined ||
      typeof grammy !== 'boolean'
    ) {
      throw new BadRequestException('Name, grammy are required');
    }
    const artist = await this.artistRepository.findOneBy({
      id,
    });
    checkArtistExist(artist);
    return await this.artistRepository.save({
      id,
      isFavorite: artist.isFavorite,
      name,
      grammy,
    });
  }

  async deleteArtist(id: string) {
    getValidUuid(id);
    const artist = await this.artistRepository.findOneBy({ id });
    checkArtistExist(artist);
    return await this.artistRepository.delete(id);
  }
}
