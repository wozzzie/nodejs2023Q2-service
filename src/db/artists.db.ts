import { v4 as uuidv4 } from 'uuid';

const ARTISTS_DB = [
  {
    id: '92b9e434-20e6-41af-b1c8-7b471a950570',
    name: 'Michael Levin',
    grammy: true,
  },
  {
    id: uuidv4(),
    name: 'Sara Connor',
    grammy: false,
  },
];

export default ARTISTS_DB;
