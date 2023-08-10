import { FavoriteEntity } from '../../favorites/entities/favorite.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.artist)
  favorites: FavoriteEntity[];
}
