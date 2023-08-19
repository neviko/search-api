import { Request, Response, Router } from "express";
import { filterVideos } from "./search.service";
import { TSearchParams } from "../../types/search.types";
import { InternalError } from "../../errors/internal-error";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const params: TSearchParams = req.query as TSearchParams;
  const videos = filterVideos(params);
  if (!videos) {
    throw new InternalError("Error while fetching videos");
  }
  res.send(videos);
});

export { router as searchRouter }; // or ES6
