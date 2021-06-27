import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Winner } from '../winners/winners.model';

interface PrizeCreationAttrs {
  title: string;
  cost: number;
}

@Table({ tableName: 'prizes' })
export class Prize extends Model<Prize, PrizeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cost: number;

  @BelongsToMany(() => User, () => Winner)
  winners: User[];
}
