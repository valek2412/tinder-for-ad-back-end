import { Module } from '@nestjs/common';
import { PrizesService } from './prizes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Prize } from './prizes.model';
import { PrizesController } from './prizes.controller';
import { User } from '../users/users.model';
import { FilesModule } from '../files/files.module';

@Module({
  providers: [PrizesService],
  imports: [SequelizeModule.forFeature([Prize, User]), FilesModule],
  controllers: [PrizesController],
  exports: [PrizesService],
})
export class PrizesModule {}
