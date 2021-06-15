import { Actors } from "./../../models/Actors";
import BadRequestException from "../../shared/exception/BadRequestException";
import { sequelize } from "../../sequelize";
import NotFoundException from "../../shared/exception/NotFoundException";

/**
 * @class ActorService
 */
export class ActorService {
  /**
   * @method  findAllEvents
   * @description get all Actors
   * @returns []
   * @param data
   */
  public static async findAll(data: any) {
    return await Actors.findAndCountAll({
      limit: data.per_page || 50,
      offset: data.page || 0,
      order: [["id", "DESC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  public static async findByStreak(data: any) {
    return await Actors.findAndCountAll({
      limit: data.per_page || 50,
      offset: data.page || 0,
      order: [["createdAt", "DESC"]],
      group: ["createdAt"],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  /**
   * @method  findAllEvents
   * @description get all Events
   * @returns []
   * @param data
   */
  public static async update(id: number, login: string, avatar_url: string) {
    const t = await sequelize.transaction();

    const actor = await Actors.findOne({ where: { id } });
    if (actor) {
      if (actor.login === login) {
        await actor.update(
          { avatar_url: avatar_url || actor.avatar_url },
          {
            where: { id },
            transaction: t,
          }
        );
        await t.commit();
        return Actors.findOne({
          where: { id },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
      }

      await t.rollback();
      throw new BadRequestException("other fields were updated for actor");
    } else {
      await t.rollback();
      throw new NotFoundException("invalid actor id");
    }
  }
}
