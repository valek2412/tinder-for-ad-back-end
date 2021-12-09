import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Winner } from '../winners/winners.model';

interface PrizeCreationAttrs {
  title: string;
  cost: number;
  image: string;
}

@Table({ tableName: 'prizes' })
export class Prize extends Model<Prize, PrizeCreationAttrs> {
  @Unique
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  image: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cost: number;

  @BelongsToMany(() => User, () => Winner)
  winners: User[];
}
