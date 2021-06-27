import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
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
}
