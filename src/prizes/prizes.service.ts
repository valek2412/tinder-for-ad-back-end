import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Prize } from './prizes.model';
import { CreatePrizeDto } from './dto/createPrize.dto';
import { User } from '../users/users.model';

@Injectable()
export class PrizesService {
  constructor(
    @InjectModel(Prize) private prizeModel: typeof Prize,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async createPrize(dto: CreatePrizeDto) {
    const prize = await this.prizeModel.create(dto);
    return prize;
  }

  async getAllPrizes() {
    const prizes = await this.prizeModel.findAll({
      include: {
        model: this.userModel,
        as: 'winners',
        through: { attributes: [] },
      },
    });
    return prizes;
  }

  async getPrizeById(id: number) {
    const prize = await this.prizeModel.findByPk(id, {
      include: {
        model: this.userModel,
        as: 'winners',
        through: { attributes: [] },
      },
    });
    return prize;
  }

  async getPrizeCost(id: number) {
    const { cost } = await this.prizeModel.findByPk(id, {
      attributes: ['cost'],
    });
    return cost;
  }
}
