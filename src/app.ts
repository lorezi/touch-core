require("dotenv").config();
import express from "express";
import cors from "cors";
import { routerBase } from "./modules/routes";
import errorMiddleware from "./shared/middlewares/errorHandler";
import NotFoundException from "./shared/exception/NotFoundException";
import helmet from "helmet";

const app = express();

app.enable("trust proxy");

// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from the body into req.body
// middleware ===> modifies the request
// Limit the number of data we can pass into a body response
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/", routerBase);
app.use(cors());

app.all("*", (req, _res, next) => {
  next(new NotFoundException(`Can't find ${req.originalUrl} on this server!'`));
});

app.use(errorMiddleware);

export default app;
