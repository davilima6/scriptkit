// Name: Translate
// Description: Translate with DeepL
// @see https://www.deepl.com/en/docs-api/

import '@johnlindquist/kit';
import type { DeeplLanguages } from 'deepl';
import { DEEPL_API_KEY } from '../lib/config.js';

const TARGET_LANGS: DeeplLanguages[] = ['EN', 'DE'];

const translate = (await npm('deepl')) as typeof import('deepl');
const userInput = await getSelectedText();

let targetLang: DeeplLanguages = await arg('Translate to', TARGET_LANGS);

try {
  const {
    data: {
      translations: [{ text: translation }],
    },
  } = await translate({
    auth_key: DEEPL_API_KEY,
    // formality?: 'default' | 'more' | 'less';
    free_api: true,
    preserve_formatting: '0',
    target_lang: targetLang,
    text: userInput,
  });

  await setSelectedText(translation);
} catch (error) {
  console.error(error);
}
