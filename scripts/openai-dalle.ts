// Name: OpenAI - Generate image
// Description: Generate image from a prompt

import '@johnlindquist/kit';
import { getOpenAPIClient } from '../lib/shared';

const RESOURCE_NAME = 'sumup-dev-eu' || 'sumup-us-dev';
const DEPLOYMENT_ID = 'gpt-4' || 'text-davinci-003';

const IMAGE_AMOUNT = 1;
const IMAGE_SIZE = '1024x1024';

const userInput = await arg('Describe the image to be generated');

try {
  const openai = await getOpenAPIClient(RESOURCE_NAME);
  const { data: images } = await openai.getImages(DEPLOYMENT_ID, userInput, { n: IMAGE_AMOUNT, size: IMAGE_SIZE });

  for (const image of images) {
    md(`Image generation result URL: ${image.url}`);
    // preview
  }
} catch (error) {
  inspect(error);
}
