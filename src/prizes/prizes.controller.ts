import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PrizesService } from './prizes.service';
import { CreatePrizeDto } from './dto/createPrize.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('prizes')
export class PrizesController {
  constructor(private prizesService: PrizesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPrize(@Body() dto: CreatePrizeDto, @UploadedFile() image) {
    const prize = this.prizesService.createPrize(dto, image);
    return prize;
  }

  @Get()
  getAllPrizes() {
    const prizes = this.prizesService.getAllPrizes();
    return prizes;
  }

  @Get('/:id')
  getPrizeById(@Param('id') id: number) {
    const prizes = this.prizesService.getPrizeById(id);
    return prizes;
  }
}
