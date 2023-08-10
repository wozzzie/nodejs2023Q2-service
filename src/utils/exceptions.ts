import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class LoginAndPasswordRequiredException extends BadRequestException {
  constructor() {
    super('Login and password are required');
  }
}

export class InvalidOldPasswordException extends ForbiddenException {
  constructor() {
    super('Invalid old password');
  }
}

export class InvalidDataException extends BadRequestException {
  constructor() {
    super('Invalid data');
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super('User not found');
  }
}

export class InvalidUserIdException extends BadRequestException {
  constructor() {
    super('Invalid userId');
  }
}

export class TrackNotFoundException extends NotFoundException {
  constructor() {
    super('Track not found');
  }
}

export class TrackNotCorrespondExeption extends UnprocessableEntityException {
  constructor() {
    super(`The track does not correspond`);
  }
}

export class AlbumNotCorrespondExeption extends UnprocessableEntityException {
  constructor() {
    super(`The album does not correspond`);
  }
}

export class ArtistNotCorrespondExeption extends UnprocessableEntityException {
  constructor() {
    super(`The artist does not correspond`);
  }
}

export class ArtistNotFoundException extends NotFoundException {
  constructor() {
    super('Artist not found');
  }
}

export class AlbumNotFoundException extends NotFoundException {
  constructor() {
    super('Album not found');
  }
}
