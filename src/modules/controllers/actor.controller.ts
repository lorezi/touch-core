import { ActorService } from "./../services/actor.service";
import { NextFunction, Request, Response } from "express";
import { handleSuccess } from "../../shared/utils/responseHandler";

export default class ActorController {
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
      const events = await ActorService.findAll(req.query);
      return handleSuccess(200, "actors fetched", events.rows, req, res);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @method  findAll
   * @description find events by streak
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns handleSuccess
   */
  public static async findByStreak(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const events = await ActorService.findAll(req.query);
      return handleSuccess(200, "actors fetched", events.rows, req, res);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @method  findAll
   * @description update event
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns handleSuccess
   */
  public static async updateActor(req: any, res: Response, next: NextFunction) {
    try {
      const comment = await ActorService.update(
        req.body.id,
        req.body.login,
        req.body.avatar_url
      );
      return handleSuccess(200, "actor updated", comment, req, res);
    } catch (e) {
      next(e);
    }
  }
}
