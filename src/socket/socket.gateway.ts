import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { NotificationService } from '@app/notification/notification.service';
import {
  NotifyArrivalToEstablishment,
  NotifyEstablishmentToDelivery,
} from './socket.model';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection {
  constructor(private notificationService: NotificationService) {}
  @WebSocketServer() server: Server = new Server();

  private logger = new Logger('NotificationGateway');

  async handleConnection(socket: Socket): Promise<void> {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }

  @SubscribeMessage('notify-arrival-to-establishment')
  async handleNotifyEstablishment(
    @MessageBody()
    payload: NotifyArrivalToEstablishment,
  ): Promise<void> {
    await this.notificationService.createNotification(payload.user);
    this.server.emit('notify-establishment');
  }

  @SubscribeMessage('notify-establishment-to-delivery')
  async handleNotifyDeliveryMan(
    @MessageBody()
    payload: NotifyEstablishmentToDelivery,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    await this.notificationService.confirmNotification(
      payload.notificationId,
      payload.user,
    );
    this.server.emit('notify-delivery');
    this.server.to(client.id).emit('notify-establishment');
  }
}
