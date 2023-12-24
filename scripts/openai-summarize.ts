// Name: OpenAI - Summarize
// Description: Summarize selected text with Azure's OpenAI

import '@johnlindquist/kit';
import { OPENAPI_RESOURCE_NAME } from '../lib/config';
import { getOpenAPIClient } from '../lib/shared';

const DEPLOYMENT_ID = 'gpt-4' || 'text-davinci-003';
const MAX_TOKENS = 64;

function getPromptMessage(userInput: string): string {
  return `
    Summarize the following text.

    Text:
    """"""
    ${userInput}
    """"""

    Summary:
  `;
}

const userInput = await arg('Prompt OpenAPI');
const prompt = [getPromptMessage(userInput)];

try {
  const openai = await getOpenAPIClient(OPENAPI_RESOURCE_NAME);

  md(`Input: ${prompt}`);

  const {
    choices: [{ text: completion }],
  } = await openai.getCompletions(DEPLOYMENT_ID, prompt, {
    maxTokens: MAX_TOKENS,
  });

  md(`Summarization: ${completion}`);
} catch (error) {
  inspect(error);
}
