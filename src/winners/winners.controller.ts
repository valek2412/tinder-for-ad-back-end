import { Body, Controller, Post } from '@nestjs/common';
import { WinnersService } from './winners.service';
import { AddWinnerDto } from './dto/addWinner.dto';

@Controller('winners')
export class WinnersController {
  constructor(private winnerService: WinnersService) {}

  @Post()
  addWinner(@Body() dto: AddWinnerDto) {
    const winner = this.winnerService.addWinner(dto);
    return winner;
  }
}
