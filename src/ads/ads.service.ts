import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ad } from './ads.model';
import { CreateAdDto } from './dto/createAd.dto';
import { FilesService } from '../files/files.service';
import { User } from '../users/users.model';

@Injectable()
export class AdsService {
  constructor(
    private fileService: FilesService,
    @InjectModel(Ad) private AdModel: typeof Ad,
    @InjectModel(User) private UserModel: typeof User,
  ) {}

  async createAd(dto: CreateAdDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const ad = await this.AdModel.create({ ...dto, image: fileName });
    return ad;
  }

  async deleteAd(id: number) {
    const ad = await this.AdModel.destroy({ where: { id } });
    return ad;
  }

  async getAllAds() {
    const ad = await this.AdModel.findAll();
    return ad;
  }

  async getAdById(id: number) {
    const ad = await this.AdModel.findByPk(id, {
      include: {
        model: this.UserModel,
        as: 'users',
        through: { attributes: ['mark'], as: 'evaluation' },
      },
    });
    return ad;
  }

  async incrementField(id: number, field: keyof Ad) {
    const ad = await this.AdModel.increment(field, { where: { id } });
    return ad;
  }
}
