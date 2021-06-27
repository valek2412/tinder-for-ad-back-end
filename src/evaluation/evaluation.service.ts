import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Evaluation } from './evaluation.model';
import { AddMarkDto } from './dto/addMark.dto';
import { AdsService } from '../ads/ads.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectModel(Evaluation) private evaluationModel: typeof Evaluation,
    private adsService: AdsService,
    private userService: UsersService,
  ) {}

  async addMark(dto: AddMarkDto) {
    const mark = await this.evaluationModel.create(dto);
    await this.incrementValues(dto);
    return mark;
  }

  async incrementValues(dto: AddMarkDto) {
    await this.adsService.incrementField(dto.adId, 'views');
    if (dto.mark.toString() === 'like') {
      await this.adsService.incrementField(dto.adId, 'likesCount');
      await this.userService.addPoints(dto.userId, 2);
    }
    if (dto.mark.toString() === 'dislike') {
      await this.adsService.incrementField(dto.adId, 'dislikesCount');
      await this.userService.addPoints(dto.userId, 1);
    }
    if (dto.mark.toString() === 'favourite') {
      await this.adsService.incrementField(dto.adId, 'favouritesCount');
      await this.userService.addPoints(dto.userId, 3);
    }
  }
}
