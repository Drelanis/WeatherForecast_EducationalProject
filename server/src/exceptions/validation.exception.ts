import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException<T> extends HttpException {
  messages: T;

  constructor(response: T) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
