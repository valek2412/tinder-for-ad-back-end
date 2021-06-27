import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAdDto } from './dto/createAd.dto';

@Controller('ads')
export class AdsController {
  constructor(private adsService: AdsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createAd(@Body() dto: CreateAdDto, @UploadedFile() image) {
    return this.adsService.createAd(dto, image);
  }

  @Delete('/:id')
  deleteAd(@Param('id') id: number) {
    return this.adsService.deleteAd(id);
  }

  @Get()
  getAllAds() {
    return this.adsService.getAllAds();
  }

  @Get('/:id')
  getAdById(@Param('id') id: number) {
    return this.adsService.getAdById(id);
  }
}
