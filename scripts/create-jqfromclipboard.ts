// Menu: JQ from Clipboard
// Description: Run JQ on clipboard text

import '@johnlindquist/kit';

const clipboardText = await clipboard.readText();
// const clipboardEscaped = JSON.stringify(clipboardText);

const stdout = await $`echo ${clipboardText} | jq`;

await clipboard.writeText(stdout['_combined']);
