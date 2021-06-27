import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrizesService } from './prizes.service';
import { CreatePrizeDto } from './dto/createPrize.dto';

@Controller('prizes')
export class PrizesController {
  constructor(private prizesService: PrizesService) {}

  @Post()
  createPrize(@Body() dto: CreatePrizeDto) {
    const prize = this.prizesService.createPrize(dto);
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
