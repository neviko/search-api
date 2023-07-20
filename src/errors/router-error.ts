import { CustomError } from "./custom-error";
import { StatusCodes } from "http-status-codes";
export class RouterError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  reason = "This route does not exist";
  constructor() {
    super();
    Object.setPrototypeOf(this, RouterError.prototype);
  }
  formatErrors() {
    return [{ message: this.reason }];
  }
}
