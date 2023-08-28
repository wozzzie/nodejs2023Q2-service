import { v4 as uuidv4 } from 'uuid';

const ALBUMS_DB = [
  {
    id: uuidv4(),
    name: 'Stargazing',
    year: 1948,
    artistId: null,
  },
  {
    id: uuidv4(),
    name: 'Moon',
    year: 2011,
    artistId: '92b9e434-20e6-41af-b1c8-7b471a950570',
  },
];

export default ALBUMS_DB;
