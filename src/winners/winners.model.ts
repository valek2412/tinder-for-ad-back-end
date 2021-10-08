import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Prize } from '../prizes/prizes.model';

interface WinnerCreationAttrs {
  userId: number;
  prizeId: number;
}

@Table({
  tableName: 'winners',
  createdAt: false,
  updatedAt: false,
})
export class Winner extends Model<Winner, WinnerCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => Prize)
  @Column({
    type: DataType.INTEGER,
  })
  prizeId: number;
}
