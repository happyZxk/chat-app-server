import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatGPTService } from './chat.service';

@Module({
  providers: [ChatGateway, ChatGPTService],
})
export class ChatModule {}
