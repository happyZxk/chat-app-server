export interface ChatGPTRequest {
  prompt: string;
  max_tokens: number;
}

export interface ChatGPTResponse {
  choices: Array<{ text: string }>;
}
