import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Ad } from '../ads/ads.model';
import { User } from '../users/users.model';

interface EvaluationCreationAttrs {
  userId: number;
  adId: number;
  mark: string;
}

@Table({ tableName: 'evaluation', createdAt: false, updatedAt: false })
export class Evaluation extends Model<Evaluation, EvaluationCreationAttrs> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  userId: number;

  @ForeignKey(() => Ad)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  adId: number;

  @Column({
    type: DataType.ENUM('like', 'dislike', 'favourite'),
  })
  mark: string;
}
