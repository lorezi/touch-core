import { Repos } from "./../../models/Repos";
import { Actors } from "./../../models/Actors";
import { Events } from "../../models/Events";
import BadRequestException from "../../shared/exception/BadRequestException";
import { sequelize } from "../../sequelize";
import NotFoundException from "../../shared/exception/NotFoundException";

/**
 * @class EventService
 */
export class EventService {
  /**
   * @method  create
   * @description submit a Event entry for a user
   * @returns {}
   * @param data
   */
  public static async create(data: any) {
    const t = await sequelize.transaction();

    try {
      if (data.actor && data.repo) {
        const actor = await Actors.create(
          {
            login: data.actor.login,
            avatar_url: data.actor.avatar_url,
          },
          {
            transaction: t,
          }
        );

        const repo = await Repos.create(
          {
            name: data.repo.name,
            url: data.repo.url,
          },
          {
            transaction: t,
          }
        );

        const Event = await Events.create(
          {
            type: data.type,
            actorId: actor.id,
            repoId: repo.id,
          },
          {
            transaction: t,
          }
        );

        await t.commit();
        return Event;
      }

      throw new BadRequestException("failed to create Event");
    } catch (err) {
      await t.rollback();

      throw new BadRequestException("failed to create Event");
    }
  }

  /**
   * @method  findOneEvent
   * @description get a single event
   * @returns {}
   * @param data
   */
  public static async findOneEvent(data: any) {
    const event = await Events.findOne({
      where: { id: data.actorId },
      include: [
        {
          model: Actors,
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },

        {
          model: Repos,
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
      ],

      attributes: {
        exclude: ["actorId", "repoId", "updatedAt"],
      },
      logging: false,
    });
    if (event) {
      return event;
    } else {
      throw new NotFoundException("invalid event id");
    }
  }

  /**
   * @method  findAllEvents
   * @description get all Events
   * @returns []
   * @param data
   */
  public static async findAllEvents(data: any) {
    return await Events.findAndCountAll({
      limit: data.per_page || 50,
      offset: data.page || 0,
      include: [
        {
          model: Actors,
          attributes: {
            exclude: ["updatedAt"],
          },
        },

        {
          model: Repos,
          attributes: {
            exclude: ["updatedAt"],
          },
        },
      ],

      attributes: {
        exclude: ["actorId", "repoId", "updatedAt"],
      },
    });
  }

  /**
   * @method  deleteComment
   * @description delete a comment
   * @returns {}
   */
  public static async deleteEvents() {
    try {
      return await Events.destroy({ where: {} });
    } catch (e) {
      throw new BadRequestException("could not erase events");
    }
  }
}
