import { validate as isUuidValid } from 'uuid';
import { InvalidUserIdException } from './exceptions';

const getValidUuid = (id: string): void => {
  if (!isUuidValid(id)) {
    throw new InvalidUserIdException();
  }
};

export default getValidUuid;
