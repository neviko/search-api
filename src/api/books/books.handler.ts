import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalError } from "../../errors/internal-error";

export const getBooks = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).send("book inal abook");
};

export const addBook = (req: Request, res: Response) => {
  console.log("in add book");

  throw new InternalError("Just a test");
};
