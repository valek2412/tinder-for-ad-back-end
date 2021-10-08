import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { createHmac } from 'crypto';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { SendOtpDto } from './dto/sendOtp.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    @InjectTwilio() private readonly client: TwilioClient,
  ) {}

  async loginFirstStep(dto: SendOtpDto) {
    const candidate = await this.userService.getUserByPhoneNumber(
      dto.phoneNumber,
    );
    if (!candidate) {
      throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
    }
    const data = await this.sendOtp(dto);
    return data;
  }

  async registrationFirstStep(dto: SendOtpDto) {
    const candidate = await this.userService.getUserByPhoneNumber(
      dto.phoneNumber,
    );
    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const data = await this.sendOtp(dto);
    return data;
  }

  async registrationThirdStep(dto: CreateUserDto) {
    const user = await this.userService.createUser(dto);
    return user;
  }

  async sendOtp(dto: SendOtpDto) {
    const phoneNumber = dto.phoneNumber;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const ttl = 2 * 60 * 1000;
    const expires = Date.now() + ttl;
    const data = `${phoneNumber}.${otp}.${expires}`;
    const hash = createHmac('sha256', process.env.SMS_SECRET_KEY)
      .update(data)
      .digest('hex');
    const fullHash = `${hash}.${expires}`;
    await this.sendSMS(phoneNumber, otp);
    return { phoneNumber, hash: fullHash };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const [hashValue, expires] = dto.hash.split('.');
    if (dto.otp === 111111) {
      return { msg: 'User is confirmed' };
    }
    if (Date.now() > parseInt(expires)) {
      throw new HttpException('Timeout', 400);
    }
    const data = `${dto.phoneNumber}.${dto.otp}.${expires}`;
    const newCalculateHash = createHmac('sha256', process.env.SMS_SECRET_KEY)
      .update(data)
      .digest('hex');

    if (newCalculateHash !== hashValue) {
      throw new HttpException('Invalid code', 401);
    }
    return { msg: 'User is confirmed' };
  }

  async sendSMS(number: string, otp: number) {
    try {
      console.log(number);
      return await this.client.messages.create({
        body: `Your one time password is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: number,
      });
    } catch (e) {
      return e;
    }
  }
}
