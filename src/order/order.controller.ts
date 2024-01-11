import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '@app/auth/jwt/jwt.guard';
import { User } from '@prisma/client';
import { Roles } from '@app/auth/role.decorator';
import { RoleGuard } from '@app/auth/role.guard';
import { OrderSerivce } from './order.service';

@Roles('DELIVERY_MAN')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderSerivce) {}

  @Get('')
  async findAll(@Request() req: { user: User }) {
    return this.orderService.findAll(req.user.id);
  }

  @Get(':id')
  async findOrdersForDelivery(
    @Param('id') id: string,
    @Request() req: { user: User },
  ) {
    return this.orderService.findById(id, req.user.id);
  }
}
