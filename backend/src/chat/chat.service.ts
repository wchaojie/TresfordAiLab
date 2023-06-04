import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { AI_PROMPT, Client, HUMAN_PROMPT } from '@anthropic-ai/sdk';
import { TChatReq } from '@/types/chat';

dotenv.config();

@Injectable()
export class ChatService {
  completionSync(param: TChatReq): Promise<any> {
    const client = new Client(process.env.ANTHROPIC_API_KEY);

    return client
      .complete({
        prompt: `${HUMAN_PROMPT} ${param.prompt}${AI_PROMPT}`,
        stop_sequences: [HUMAN_PROMPT],
        max_tokens_to_sample: param.maxTokens || 500,
        model: param.model || 'claude-v1',
        temperature: param.temperature || 0.8,
      })
      .then((completion) => {
        // console.log('Finished sampling:\n', completion);
        return completion;
      })
      .catch((error) => {
        // console.error('Error: ', error);
        throw new Error(error);
      });
  }
}
