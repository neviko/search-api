import express from "express";
import { json } from "body-parser";
import { activateRoutes } from "./routes";
import { errorHandler } from "./middlewares/error-handler.middleware";

const app = express();
app.use(json());
app.use(errorHandler);
activateRoutes();

export { app };
