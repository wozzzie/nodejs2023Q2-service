import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumService } from './albums.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumsController],
  providers: [AlbumService],
})
export class AlbumsModule {}
