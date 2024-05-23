import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatGPTService } from './chat.service';

interface ClientData {
  timeout: NodeJS.Timeout;
  context: string[];
}

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private readonly clients: Map<string, ClientData> = new Map();

  constructor(private readonly chatGPTService: ChatGPTService) {}

  afterInit(server: Server) {
    console.log('WebSocket initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.clients.set(client.id, { timeout: null, context: [] });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client.id);
  }

  @SubscribeMessage('message')
  async handleMessage(
    client: Socket,
    payload: { sender: string; message: string },
  ): Promise<void> {
    const clientData = this.clients.get(client.id);
    if (clientData.timeout) {
      clearTimeout(clientData.timeout);
    }
    clientData.timeout = setTimeout(async () => {
      const botResponse = await this.chatGPTService.getResponse(
        payload.message,
        clientData.context,
      );
      const responsePayload = { sender: '机器人', message: botResponse };
      // 记录上下文 用户的消息和 机器人回答的消息
      clientData.context.push(`${payload.message}`);
      clientData.context.push(`${botResponse}`);
      this.server.emit('message', responsePayload);
    }, 5000);
  }
}
