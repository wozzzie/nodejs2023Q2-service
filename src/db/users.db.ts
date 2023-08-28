import { User } from '../types/usersInterface';
import { v4 as uuidv4 } from 'uuid';

const USERS_DB: User[] = [
  {
    id: uuidv4(),
    login: 'test_login',
    password: 'testPassword',
    version: 1,
    createdAt: 1690749402172,
    updatedAt: 1690749402172,
  },
  {
    id: uuidv4(),
    login: 'test_login2',
    password: 'testPassword2',
    version: 1,
    createdAt: 1690749402173,
    updatedAt: 1690749402173,
  },
];

export default USERS_DB;
