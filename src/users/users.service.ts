import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/createUser.dto';
import { Ad } from '../ads/ads.model';
import { Evaluation } from '../evaluation/evaluation.model';
import { AdsService } from '../ads/ads.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Ad) private adModel: typeof Ad,
    @InjectModel(Evaluation) private evaluationModel: typeof Evaluation,
    private adsService: AdsService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userModel.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userModel.findAll();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userModel.findByPk(id);
    return user;
  }

  async getEvaluatedAdsByUserId(id: number, mark: string) {
    const { evaluatedAds } = await this.userModel.findByPk(id, {
      include: {
        model: this.adModel,
        as: 'ads',
        through: {
          attributes: ['mark'],
          as: 'evaluation',
          where: { mark },
        },
      },
      attributes: [],
    });
    return evaluatedAds;
  }

  async getNotEvaluatedAdsByUserId(id: number) {
    const { evaluatedAds } = await this.userModel.findByPk(id, {
      include: {
        model: this.adModel,
        through: {
          attributes: [],
        },
      },
      attributes: [],
    });
    const allAds = await this.adsService.getAllAds();

    const result = allAds.reduce((acc: Ad[], item: Ad) => {
      if (evaluatedAds.findIndex((i: Ad) => i.id === item.id) === -1)
        acc.push(item);
      return acc;
    }, []);

    return result;
  }

  async getUserByPhoneNumber(phoneNumber: string) {
    const user = await this.userModel.findOne({
      where: { phoneNumber },
    });
    return user;
  }

  async addPoints(id: number, count: number) {
    const user = await this.userModel.increment('points', {
      by: count,
      where: { id },
    });
    return user;
  }

  async getUserPoints(id: number) {
    const { points } = await this.userModel.findByPk(id, {
      attributes: ['points'],
    });
    return points;
  }
}
