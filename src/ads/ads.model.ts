import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Evaluation } from '../evaluation/evaluation.model';

interface AdCreationAttrs {
  title: string;
  content: string;
  image: string;
}

@Table({ tableName: 'ads' })
export class Ad extends Model<Ad, AdCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  content: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  image: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  views: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  likesCount: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  dislikesCount: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  favouritesCount: number;

  @BelongsToMany(() => User, () => Evaluation)
  users: User[];
}
