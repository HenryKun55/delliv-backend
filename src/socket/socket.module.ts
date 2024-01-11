import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { NotificationModule } from '@app/notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [SocketGateway],
})
export class SocketModule {}
