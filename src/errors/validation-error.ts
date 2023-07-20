import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
import { StatusCodes } from "http-status-codes";
export class ReqValidationError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  constructor(private errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, ReqValidationError.prototype);
  }
  formatErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
