import { Track } from '../types/tracksInterface';
import { v4 as uuidv4 } from 'uuid';

const TRACKS_DB: Track[] = [
  {
    id: uuidv4(),
    name: 'Song 1',
    artistId: '92b9e434-20e6-41af-b1c8-7b471a950570',
    albumId: 'c1be5027-96c3-4db3-83b0-985f7e3562a1',
    duration: 240,
  },
  {
    id: uuidv4(),
    name: 'Song 2',
    artistId: null,
    albumId: 'a1c3ef61-8ed1-499e-96bc-c0740a4d547e',
    duration: 180,
  },
];

export default TRACKS_DB;
