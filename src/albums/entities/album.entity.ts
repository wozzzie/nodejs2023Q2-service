import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { FavoriteEntity } from '../../favorites/entities/favorite.entity';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => ArtistEntity)
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;

  @Column({ nullable: true })
  artistId: string | null;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.album)
  favorites: FavoriteEntity[];
}
