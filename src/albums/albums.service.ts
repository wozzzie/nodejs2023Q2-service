import { BadRequestException, Injectable } from '@nestjs/common';
import { checkAlbumExist } from 'src/utils/checkExist';
import { CreateAlbumsDto } from './dto/createAlbumsDto.dto';
import { UpdateAlbumsDto } from './dto/updateAlbumsDto.dto';
import { Album } from 'src/types/albumsInterface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAllAlbums(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  async getAlbumById(id: string): Promise<Album> {
    const album = await this.albumRepository.findOneBy({ id });
    checkAlbumExist(album);
    return album;
  }

  async createAlbum(createAlbumsDto: CreateAlbumsDto): Promise<Album> {
    const { name, year, artistId } = createAlbumsDto;

    if (
      (name && year === undefined) ||
      typeof name !== 'string' ||
      typeof year !== 'number'
    ) {
      throw new BadRequestException('Name, year, artistId are required');
    }

    const newAlbum = this.albumRepository.create({
      name,
      year,
      artistId: artistId ?? null,
    });

    this.albumRepository.save(newAlbum);
    return newAlbum;
  }

  async updateAlbum(
    id: string,
    updateAlbumsDto: UpdateAlbumsDto,
  ): Promise<Album> {
    const { name, year, artistId } = updateAlbumsDto;

    if (
      (name && year === undefined) ||
      typeof name !== 'string' ||
      typeof year !== 'number'
    ) {
      throw new BadRequestException('Name, year, artistId are required');
    }

    const album = await this.getAlbumById(id);

    album.name = name;
    album.year = year;
    album.artistId = artistId || null;
    await this.albumRepository.save(album);
    return album;
  }

  async deleteAlbum(id: string): Promise<void> {
    const album = await this.getAlbumById(id);

    await this.albumRepository.delete(album);

    // TRACKS_DB.forEach((track: Track) => {
    //   if (track.albumId === id) {
    //     track.albumId = null;
    //   }
    // });
    // deleteAppropriateAlbum(album);

    // deleteAppropriateFav('Album', album as Album);
  }
}
