import { Module } from '@nestjs/common';
import { PrizesService } from './prizes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Prize } from './prizes.model';
import { PrizesController } from './prizes.controller';
import { User } from '../users/users.model';

@Module({
  providers: [PrizesService],
  imports: [SequelizeModule.forFeature([Prize, User])],
  controllers: [PrizesController],
  exports: [PrizesService],
})
export class PrizesModule {}
