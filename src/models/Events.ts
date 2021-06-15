import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Actors } from "./Actors";
import { Repos } from "./Repos";

@Table({ tableName: "events" })
export class Events extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  public id!: number;

  @Column(DataType.STRING)
  public type!: string;

  @BelongsTo(() => Actors)
  public actor!: Actors;

  @ForeignKey(() => Actors)
  @Column(DataType.INTEGER)
  public actorId!: number;

  @BelongsTo(() => Repos)
  public repo!: Repos;

  @ForeignKey(() => Repos)
  @Column(DataType.INTEGER)
  public repoId!: number;

  @CreatedAt
  @Column(DataType.DATE)
  public createdAt!: Date;
}
