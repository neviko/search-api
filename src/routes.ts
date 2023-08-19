import { Request, Response } from "express";
import { searchRouter } from "./api/search/search.controller";
import { app } from "./app";
import { RouterError } from "./errors/router-error";

export const activateRoutes = () => {
  app.use("/api/search", searchRouter);
  app.all("*", async (req: Request, res: Response) => {
    throw new RouterError();
  });
};
