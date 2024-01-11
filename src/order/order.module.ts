import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma/prisma.module';
import { OrderController } from './order.controller';
import { OrderSerivce } from './order.service';

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [OrderSerivce],
  exports: [OrderSerivce],
})
export class OrderModule {}
