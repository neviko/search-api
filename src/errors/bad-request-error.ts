import { CustomError } from "./custom-error";
import { StatusCodes } from "http-status-codes";
export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;

  constructor(private reason: string) {
    super();
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  formatErrors() {
    return [{ message: this.reason }];
  }
}
