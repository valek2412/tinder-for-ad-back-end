import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Evaluation } from '../evaluation/evaluation.model';
import { Ad } from '../ads/ads.model';
import { Prize } from '../prizes/prizes.model';
import { Winner } from '../winners/winners.model';

interface UserCreationAttrs {
  phoneNumber: string;
  name: string;
  surname: string;
  birthDate: string;
  city: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @PrimaryKey
  @Unique
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  surname: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  birthDate: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  points: number;

  @BelongsToMany(() => Ad, () => Evaluation)
  evaluatedAds: Ad[];

  @BelongsToMany(() => Prize, () => Winner)
  prizes: Prize[];
}
