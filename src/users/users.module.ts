import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Ad } from '../ads/ads.model';
import { Evaluation } from '../evaluation/evaluation.model';
import { AdsModule } from '../ads/ads.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Ad, Evaluation]), AdsModule],
  exports: [UsersService],
})
export class UsersModule {}
