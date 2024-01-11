import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { SocketModule } from './socket/socket.module';
import { EstablishmentModule } from './establishment/establishment.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    PrismaModule,
    SocketModule,
    AuthModule,
    UserModule,
    NotificationModule,
    EstablishmentModule,
    OrderModule,
  ],
})
export class AppModule {}
