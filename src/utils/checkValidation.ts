import { validate as isUuidValid } from 'uuid';
import { InvalidIdException } from './exceptions';

const getValidUuid = (id: string): void => {
  if (!isUuidValid(id)) {
    throw new InvalidIdException();
  }
};

export default getValidUuid;
