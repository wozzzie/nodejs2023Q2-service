import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { FavoriteEntity } from '../../favorites/entities/favorite.entity';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ArtistEntity)
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity)
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.track)
  favorites: FavoriteEntity[];
}
