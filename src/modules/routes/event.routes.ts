import express, { Router } from "express";
import { createEventSchema } from "../../shared/utils/Validation";
import EventController from "../controllers/events.controller";

const router = express.Router();

router.get("/", EventController.findAll);
router.post("/", createEventSchema, EventController.create);

router.get("/actors/:actorId", EventController.findOneEvent);
export const eventRoutes: Router = router;
