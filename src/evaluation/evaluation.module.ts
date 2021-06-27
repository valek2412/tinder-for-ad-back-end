import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Evaluation } from './evaluation.model';
import { User } from '../users/users.model';
import { Ad } from '../ads/ads.model';
import { EvaluationController } from './evaluation.controller';
import { AdsModule } from '../ads/ads.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [EvaluationService],
  imports: [
    SequelizeModule.forFeature([Evaluation, User, Ad]),
    AdsModule,
    UsersModule,
  ],
  controllers: [EvaluationController],
})
export class EvaluationModule {}
