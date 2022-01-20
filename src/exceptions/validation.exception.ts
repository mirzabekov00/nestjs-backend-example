import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidationException extends HttpException {
  constructor(response) {
    super({ errors: response }, HttpStatus.BAD_REQUEST);
  }
}
