import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
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

export class ArtistNotFoundException extends NotFoundException {
  constructor() {
    super('Track not found');
  }
}
