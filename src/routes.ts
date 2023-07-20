import { Request, Response } from "express";
import { booksRouter } from "./api/books/books.routes";
import { app } from "./app";
import { StatusCodes } from "http-status-codes";
import { RouterError } from "./errors/router-error";

export const activateRoutes = () => {
  app.use("/api/books", booksRouter);
  app.all("*", async (req: Request, res: Response) => {
    throw new RouterError();
  });
};
