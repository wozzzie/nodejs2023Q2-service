import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { Album } from 'src/types/albumsInterface';
import { Artist } from 'src/types/artistsInterface';
import { Track } from 'src/types/tracksInterface';

@Entity()
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => AlbumEntity, (album) => album.favorites)
  @JoinColumn({ name: 'album_id', referencedColumnName: 'id' })
  album: Album[];

  @ManyToOne(() => TrackEntity, (track) => track.favorites)
  @JoinColumn({ name: 'track_id', referencedColumnName: 'id' })
  track: Track[];

  @ManyToOne(() => ArtistEntity, (artist) => artist.favorites)
  @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
  artist: Artist[];
}
