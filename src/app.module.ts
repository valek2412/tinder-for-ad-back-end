import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AdsModule } from './ads/ads.module';
import { FilesModule } from './files/files.module';
import { User } from './users/users.model';
import { Ad } from './ads/ads.model';
import { AuthModule } from './auth/auth.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { Evaluation } from './evaluation/evaluation.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { TwilioModule } from 'nestjs-twilio';
import { PrizesModule } from './prizes/prizes.module';
import { WinnersModule } from './winners/winners.module';
import { Prize } from './prizes/prizes.model';
import { Winner } from './winners/winners.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Ad, Evaluation, Prize, Winner],
      autoLoadModels: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
    UsersModule,
    AdsModule,
    FilesModule,
    AuthModule,
    EvaluationModule,
    PrizesModule,
    WinnersModule,
  ],
})
export class AppModule {}
