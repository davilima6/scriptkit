// Name: OpenAI - Prompt
// Description: Prompt Azure's OpenAI

import '@johnlindquist/kit';
import { getOpenAPIClient } from '../lib/shared';

const RESOURCE_NAME = 'sumup-dev-eu' || 'sumup-us-dev';
const DEPLOYMENT_ID = 'gpt-4' || 'text-davinci-003' || 'gpt-35-turbo';
const PROMPT_CONTEXT = 'You are a helpful assistant. You will talk like a pirate.';

const openai = await getOpenAPIClient(RESOURCE_NAME);

let currentPanel = '';
let content = '';
let messages = [];

messages.push({ role: 'system', content: PROMPT_CONTEXT });

while (true) {
  content = await micro(
    {
      ignoreBlur: true,
      input: content,
      placeholder: 'Prompt OpenAI',
      strict: false,
      onEscape: () => {
        exit();
      },
    },
    currentPanel
  );

  messages.push({ role: 'user', content });

  setLoading(true);

  try {
    const response = await openai.getCompletions(DEPLOYMENT_ID, messages);
    const {
      choices: [choice],
    } = response;

    if (choice) {
      messages.push(choice);
      currentPanel = md(choice?.text);
    } else {
      dev(response);
    }
  } catch (error) {
    inspect(error);
  }
}
