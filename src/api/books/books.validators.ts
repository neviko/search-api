import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { ReqValidationError } from "../../errors/validation-error";

export const addBookValidator = () => {
  return [
    body("name")
      .isString()
      .withMessage("name property have to be valid")
      .notEmpty(),

    body("id")
      .isString()
      .notEmpty()
      .withMessage("id property have to be valid"),
    body("author")
      .isString()
      .optional()
      .withMessage("author property have to be valid"),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ReqValidationError(errors.array());
      }
      next();
    },
  ];
};
