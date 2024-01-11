import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '@app/auth/jwt/jwt.guard';
import { EstablishmentService } from './establishment.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { User } from '@prisma/client';
import { Roles } from '@app/auth/role.decorator';
import { RoleGuard } from '@app/auth/role.guard';

@Roles('ESTABLISHMENT')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('establishment')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Get(':id/orders')
  async findAll(@Request() req: { user: User }) {
    return this.establishmentService.findAll(req.user);
  }

  @Post(':id/orders')
  async createOrder(
    @Body() input: CreateOrderDto,
    @Request() req: { user: User },
  ) {
    return this.establishmentService.createOrder(input, req.user);
  }
}
