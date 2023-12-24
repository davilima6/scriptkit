// Name: Rewrite
// Description: Rewrite with DeepL
// Shortcut: opt w
// @see https://www.deepl.com/en/docs-api/

import '@johnlindquist/kit';
import type { DeeplLanguages } from 'deepl';
import { DEEPL_API_KEY } from '../lib/config.js';

const TARGET_LANG: DeeplLanguages = 'EN';

const translate = (await npm('deepl')) as typeof import('deepl');
const userInput = await getSelectedText();

// let userInput = (await getSelectedText()) || (await arg('Enter text to silent'));

// await arg({
//   placeholder: `Sleep system?`,
//   hint: `[y]/[n]`,
// });

try {
  const {
    data: {
      translations: [{ text: translation }],
    },
  } = await translate({
    auth_key: DEEPL_API_KEY,
    free_api: true,
    preserve_formatting: '1',
    target_lang: 'DE',
    text: userInput,
  });

  const {
    data: {
      translations: [{ text: rewritten }],
    },
  } = await translate({
    auth_key: DEEPL_API_KEY,
    free_api: true,
    preserve_formatting: '1',
    target_lang: TARGET_LANG,
    text: translation,
  });

  await setSelectedText(rewritten);
} catch (error) {
  console.error(error);
}
