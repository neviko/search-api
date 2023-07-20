import { CustomError } from "./custom-error";
import { StatusCodes } from "http-status-codes";
export class InternalError extends CustomError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(private reason: string) {
    super();
    Object.setPrototypeOf(this, InternalError.prototype);
  }
  formatErrors() {
    return [{ message: this.reason }];
  }
}
