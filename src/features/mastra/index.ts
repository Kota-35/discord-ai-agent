import { Mastra } from '@mastra/core';
import { simpleAgent } from './agents/simpleAgent';

export const mastra = new Mastra({
  agents: { simpleAgent },
});
