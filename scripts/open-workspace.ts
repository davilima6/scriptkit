// Name: Open Workspace
// Description: Opens a Code workspace
// @see https://www.scriptkit.com/kentcdodds
// @see https://www.scriptkit.com/scripts

import '@johnlindquist/kit';

const WORKSPACES_DIR = 'Projects/_workspaces';

const workspaces = await readdir(home(WORKSPACES_DIR));

let selected = await arg(
  'Open workspace',
  workspaces.map((workspace) => ({
    name: workspace,
    // description: home(WORKSPACES_DIR, workspace),
    value: home(WORKSPACES_DIR, workspace),
  }))
);

edit(selected);

// await editor({
//   value: `Book Outline`,
//   preview: md(`# Requirements
// - Cover Major Characters
// - Address the theme
// - Have a beginning, middle, and end
//   `),
// })
