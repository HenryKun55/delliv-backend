import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma/prisma.module';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentService } from './establishment.service';

@Module({
  imports: [PrismaModule],
  controllers: [EstablishmentController],
  providers: [EstablishmentService],
  exports: [EstablishmentService],
})
export class EstablishmentModule {}
