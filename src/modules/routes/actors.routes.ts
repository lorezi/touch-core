import express, { Router } from "express";
import ActorController from "../controllers/actor.controller";

const router = express.Router();

router.get("/", ActorController.findAll);
router.put("/", ActorController.updateActor);
router.get("/streak", ActorController.findByStreak);

export const actorRoute: Router = router;
