import { Controller, Get, Param, Patch, Body, Post } from '@nestjs/common';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get(':id')
  async getDeliveryPersonById(@Param('id') id: string) {
    const delivery = await this.deliveryService.findById(id);

    if (!delivery) {
      return { message: 'Delivery person not found' };
    }

    return delivery;
  }

  @Patch(':id/update-location')
  async updateLocation(
    @Param('id') id: string,
    @Body('location') newLocation: string,
  ) {
    const updatedDeliveryPerson = await this.deliveryService.updateLocation(
      id,
      newLocation,
    );

    if (!updatedDeliveryPerson) {
      return { message: 'Delivery person not found' };
    }

    return {
      message: 'Location updated successfully',
      delivery: updatedDeliveryPerson,
    };
  }

  @Get(':id/orders')
  async getOrdersForDeliveryPerson(@Param('id') id: string): Promise<Order[]> {
    return this.deliveryService.getOrdersForDeliveryPerson(id);
  }

  @Post(':id/notify-arrival')
  async notifyArrival(@Param('id') id: string) {
    await this.deliveryService.notifyArrival(id);
    return { message: 'Notification sent successfully' };
  }

  @Patch(':id/confirm-arrival')
  async confirmArrival(@Param('id') id: string) {
    await this.deliveryService.confirmArrival(id);
    return { message: 'Arrival confirmed successfully' };
  }

  @Post(':id/register-orders')
  async registerOrders(
    @Param('id') id: string,
    @Body('orders') orders: Order[],
  ) {
    await this.deliveryService.registerOrders(id, orders);
    return { message: 'Orders registered successfully' };
  }
}
