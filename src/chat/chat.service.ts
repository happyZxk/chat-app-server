import { Injectable } from '@nestjs/common';
import { ChatGPTRequest, ChatGPTResponse } from './dto/create-chat.dto';
import { OpenAI } from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const openai = new OpenAI({
  apiKey: 'sk-11MyOLTSRQdjQYq6Ac625aBc07814a48A4E14eDf16C72c5a',
  baseURL: 'https://api.xty.app/v1',
});

@Injectable()
export class ChatGPTService {
  async getResponse(prompt: string, context: string[]): Promise<string> {
    try {
      const messages: ChatCompletionMessageParam[] = context.map(
        (message, index) => ({
          role: index % 2 === 0 ? 'user' : 'assistant',
          content: message,
        }),
      );

      messages.push({ role: 'user', content: prompt });

      const request: ChatGPTRequest = {
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 2000,
      };
      const response = await openai.chat.completions.create({
        model: request.model,
        messages: request.messages,
        max_tokens: request.max_tokens,
      });

      return response.choices[0]?.message?.content || 'No response';
    } catch (error) {
      console.error(error);
      return '机器人睡着了一会再提问吧！！！';
    }
  }
}
