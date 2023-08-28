import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistService } from './artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistsController],
  providers: [ArtistService],
})
export class ArtistsModule {}
