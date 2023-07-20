export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract formatErrors(): { message: string; field?: string }[];

  constructor() {
    super();
    // because we are extending a build in object
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
