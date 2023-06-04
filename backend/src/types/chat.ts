export type TChatReq = {
  prompt: string;
  maxTokens?: number;
  model?:
    | 'claude-v1'
    | 'claude-instant-v1'
    | 'claude-v1-100k'
    | 'claude-instant-v1-100k';
  stream?: boolean;
  temperature?: number;
  topK?: number;
  topP?: number;
};
