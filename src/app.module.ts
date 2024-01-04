import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'delliv',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    NotificationModule,
    DeliveryModule,
  ],
})
export class AppModule {}
