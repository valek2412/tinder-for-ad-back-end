import { Module } from '@nestjs/common';
import { WinnersController } from './winners.controller';
import { WinnersService } from './winners.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Winner } from './winners.model';
import { User } from '../users/users.model';
import { Prize } from '../prizes/prizes.model';
import { UsersModule } from '../users/users.module';
import { PrizesModule } from '../prizes/prizes.module';

@Module({
  providers: [WinnersService],
  controllers: [WinnersController],
  imports: [
    SequelizeModule.forFeature([Winner, User, Prize]),
    UsersModule,
    PrizesModule,
  ],
})
export class WinnersModule {}
