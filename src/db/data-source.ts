import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AlbumEntity } from '../albums/entities/album.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { UserEntity } from '../users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD || 'mypassword',
    database: process.env.POSTGRES_DB,
    entities: [ArtistEntity, AlbumEntity, UserEntity, TrackEntity],
    synchronize: true,
    migrations: ['dist/db/migrations/*.{js,ts}'],
    migrationsTableName: 'migrations',
    migrationsRun: true,
  };
};

export default new DataSource(dataSourceOptions() as DataSourceOptions);
