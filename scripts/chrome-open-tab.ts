// Menu: Open Chrome Tab
// Description: List all Chrome tabs. Then switch to that tab
// Author: John Lindquist
// Twitter: @johnlindquist

import '@johnlindquist/kit';
import type { Choice } from '@johnlindquist/kit';
import _ from 'lodash';

const currentTabs = await getTabs();

const {
  roots: {
    bookmark_bar: { children: bookmarks },
  },
} = JSON.parse(String(await readFile(home('Library/Application Support/Google/Chrome/Default/Bookmarks'))));

const bookmarkChoices: Choice[] = bookmarks.map(({ name, url }) => ({
  name,
  description: url,
  value: url,
}));

const currentOpenChoices: Choice[] = currentTabs.map(({ title: name, url }) => ({
  name,
  description: url,
  value: url,
}));

const bookmarksAndOpen: Choice[] = [...([] || bookmarkChoices), ...currentOpenChoices];

const choices: Choice[] = _.uniqBy(bookmarksAndOpen, 'name');

const url = await arg('Focus Chrome tab:', choices);

focusTab(url);
