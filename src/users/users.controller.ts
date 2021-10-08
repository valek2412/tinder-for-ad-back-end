import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetByPhoneDto } from './dto/getByPhone.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  getUserByPhone(@Body() dto: GetByPhoneDto) {
    return this.usersService.getUserByPhoneNumber(dto.phoneNumber);
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Get('/:id/likedAds')
  getLikedAds(@Param('id') id: number) {
    return this.usersService.getEvaluatedAdsByUserId(id, 'like');
  }

  @Get('/:id/dislikedAds')
  getDislikedAds(@Param('id') id: number) {
    return this.usersService.getEvaluatedAdsByUserId(id, 'dislike');
  }

  @Get('/:id/favouriteAds')
  getFavouriteAds(@Param('id') id: number) {
    return this.usersService.getEvaluatedAdsByUserId(id, 'favourite');
  }

  @Get('/:id/notEvaluatedAds')
  get(@Param('id') id: number) {
    return this.usersService.getNotEvaluatedAdsByUserId(id);
  }
}
