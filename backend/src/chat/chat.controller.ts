import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { TChatReq } from '@/types/chat';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(200)
  async stream(@Body() data: TChatReq) {
    return {
      code: 0,
      status: 'success',
      data: await this.chatService.completionSync(data),
    };
  }
}
