import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ad } from './ads.model';
import { User } from '../users/users.model';
import { AdsService } from './ads.service';
import { FilesModule } from '../files/files.module';
import { Evaluation } from '../evaluation/evaluation.model';

@Module({
  controllers: [AdsController],
  providers: [AdsService],
  imports: [SequelizeModule.forFeature([Ad, User, Evaluation]), FilesModule],
  exports: [AdsService],
})
export class AdsModule {}
