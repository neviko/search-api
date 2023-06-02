import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { activateRoutes } from "./routes";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(json());
activateRoutes();
export { app };
