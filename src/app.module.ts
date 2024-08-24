import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ChessComModule } from './chess-com/chess-com.module';
import * as Joi from 'joi';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppExceptionFilter, AppResponseInterceptor, PrismaService } from '@app/common';
import { MidtransPaymentModule } from './midtrans-payment/midtrans-payment.module';
import { MatchRoomModule } from './match-room/match-room.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ItemVaultModule } from './item-vault/item-vault.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        WS_PORT: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        APP_NAME: Joi.string().required(),
        PREFIX_NAME: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        CHESS_COM_BASE_URI: Joi.string().required(),
        MIDTRANS_BASE_URI: Joi.string().required(),
        MIDTRANS_CLIENT_KEY: Joi.string().required(),
        MIDTRANS_SERVER_KEY: Joi.string().required()
      }),
    }),
    ChessComModule,
    MidtransPaymentModule,
    MatchRoomModule,
    AuthModule,
    UserModule,
    ItemVaultModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AppResponseInterceptor,
    },
  ]
})
export class AppModule {}
