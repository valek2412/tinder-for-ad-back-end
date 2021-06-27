import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/sendOtp.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { CreateUserDto } from '../users/dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration1')
  registrationFirstStep(@Body() dto: SendOtpDto) {
    return this.authService.registrationFirstStep(dto);
  }

  @Post('/registration2')
  registrationSecondStep(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }

  @Post('/registration3')
  registrationThirdStep(@Body() dto: CreateUserDto) {
    return this.authService.registrationThirdStep(dto);
  }

  @Post('/login1')
  loginFirstStep(@Body() dto: SendOtpDto) {
    return this.authService.loginFirstStep(dto);
  }

  @Post('/login2')
  loginSecondStep(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }
}
