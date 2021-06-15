import { NextFunction, Request, Response } from "express";
import {
  handleFailure,
  handleSuccess,
} from "../../shared/utils/responseHandler";
import { EventService } from "../services/event.service";

export default class EventController {
  /**
   * @method  create
   * @description a user is able to create an event
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns handleSuccess
   */
  public static async create(req: any, res: Response, next: NextFunction) {
    try {
      const event = await EventService.create(req.body);
      return handleSuccess(201, "event created", event, req, res);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @method  findOneEvent
   * @description It gets a single event
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns handleSuccess
   */
  public static async findOneEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const event = await EventService.findOneEvent(req.params);

      return handleSuccess(200, "event fetched", event, req, res);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @method  findAll
   * @description It gets all the events asked
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns handleSuccess
   */
  public static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await EventService.findAllEvents(req.query);
      return handleSuccess(200, "events fetched", events.rows, req, res);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @method  markRight
   * @description It deletes all events
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns handleSuccess
   */
  static async deleteEvents(req: any, res: Response, next: NextFunction) {
    try {
      const event = await EventService.deleteEvents();
      if (event) {
        return handleSuccess(200, "events deleted", undefined, req, res);
      }
      return handleFailure(400, "failed to delete", undefined, req, res);
    } catch (e) {
      next(e);
    }
  }
}
