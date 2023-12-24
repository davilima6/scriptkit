// Name: Store - Switch Domain
// Description: Switches between localhost and staging URLs

import '@johnlindquist/kit';

const LOCALHOST = 'http://localhost:3000';
const STAGING = 'https://storefront-vercel.sam-app.ro';

const userInput = await getSelectedText();

const switched = userInput.startsWith(LOCALHOST)
  ? userInput.replace(LOCALHOST, STAGING)
  : `${LOCALHOST}${new URL(userInput).pathname}`;

await setSelectedText(switched);
