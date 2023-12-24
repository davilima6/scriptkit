// Menu: Prettify
// Description: Prettify clipboard text
// @see https://prettier.io/docs/en/options.html#parser

import '@johnlindquist/kit';

import { config as prettierConfig } from '/Users/davimedeiros/Projects/foundry/dist/configs/prettier/config.js';

const FORMATS = ['json', 'css', 'typescript', 'html'];

const prettier = await npm('prettier');

const clipboardText = await clipboard.readText();
// const clipboardText = await getSelectedText();

const parser = await arg('Format', FORMATS);

const prettified = await prettier.format(clipboardText, prettierConfig({ parser }));

inspect(prettified, 'item.json');

// await setSelectedText(prettified);
// clipboard.writeText(prettified);
