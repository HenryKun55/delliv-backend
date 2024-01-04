import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface MessagePayload {
  content: string;
  sender: ;
}

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  private clients: Map<string, SocketUser> = new Map();

  handleConnection(client: Socket): void {
    const newUser: SocketUser = {
      id: client.id,
      username: `user_${client.id.substring(0, 5)}`,
    };

    this.clients.set(client.id, newUser);
    this.server.emit('userConnected', newUser);
  }

  @SubscribeMessage('delivery-arrival')
  arrival(client: Socket, payload: MessagePayload): void {
    const sender: SocketUser = this.clients.get(client.id);

    console.log({ sender, payload });

    this.server.emit('confirm-delivery-arrival', {
      sender,
      payload,
    });
  }
}
