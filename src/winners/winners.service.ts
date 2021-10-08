import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Winner } from './winners.model';
import { AddWinnerDto } from './dto/addWinner.dto';
import { UsersService } from '../users/users.service';
import { PrizesService } from '../prizes/prizes.service';

@Injectable()
export class WinnersService {
  constructor(
    @InjectModel(Winner) private winnerModel: typeof Winner,
    private userService: UsersService,
    private prizeService: PrizesService,
  ) {}

  async addWinner(dto: AddWinnerDto) {
    const winner = await this.winnerModel.create(dto);
    await this.spendPoints(dto);
    return winner;
  }

  async spendPoints(dto: AddWinnerDto) {
    const cost = await this.prizeService.getPrizeCost(dto.prizeId);
    const points = await this.userService.getUserPoints(dto.userId);
    if (cost > points) throw new HttpException('Not enough points', 400);
    await this.userService.addPoints(dto.userId, -cost);
  }
}
