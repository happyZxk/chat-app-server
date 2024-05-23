import { ChatCompletionMessageParam } from 'openai/resources';

export class CreateChatDto {}
export interface ChatGPTRequest {
  model: string;
  messages: ChatCompletionMessageParam[];
  max_tokens: number;
}

export interface ChatGPTResponse {
  choices: Array<{ text: string }>;
}
