import { Agent } from '@mastra/core/agent';

export const simpleAgent = new Agent({
  name: 'SimpleAgent',
  instructions: 'あなたは相手の質問に答えるだけの簡単なbotです',
  model: 'openai/gpt-4.1-nano',
});
