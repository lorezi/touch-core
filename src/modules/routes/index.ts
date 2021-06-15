import { actorRoute } from "./actors.routes";
import { eventRoutes } from "./event.routes";
import express, { Router } from "express";
import EventController from "../controllers/events.controller";

const router = express.Router();

router.use("/events", eventRoutes);
router.use("/actors", actorRoute);
router.delete("/erase", EventController.deleteEvents);
export const routerBase: Router = router;
