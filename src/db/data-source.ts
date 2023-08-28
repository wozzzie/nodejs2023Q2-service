import { AlbumEntity } from '../albums/entities/album.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { UserEntity } from '../users/entities/user.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER || 'myuser',
  password: process.env.POSTGRES_PASSWORD || 'mypassword',
  database: process.env.POSTGRES_DB || 'mydb',
  entities: [ArtistEntity, AlbumEntity, UserEntity, TrackEntity],
  synchronize: false,
  migrations: ['dist/db/migrations/*.{js,ts}'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
};
