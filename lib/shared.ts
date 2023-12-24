// @see https://www.npmjs.com/package/@azure/openai

import type { KeyVaultSecret } from '@azure/keyvault-secrets';
import { OPENAPI_VAULT_SECRET_NAME, VAULT_ADDR } from './config';

const { SecretClient } = (await npm('@azure/keyvault-secrets')) as typeof import('@azure/keyvault-secrets');
const { DefaultAzureCredential } = (await npm('@azure/identity')) as typeof import('@azure/identity');
const { OpenAIClient, AzureKeyCredential, OpenAIKeyCredential } = (await npm(
  '@azure/openai'
)) as typeof import('@azure/openai');

// const { setLogLevel } = await npm('@azure/logger');
// setLogLevel('info');

export async function getOpenAPIClient(resourceName) {
  const secret = await getVaultSecret(OPENAPI_VAULT_SECRET_NAME);
  const client = new OpenAIClient(getOpenAIURL(resourceName), new AzureKeyCredential(secret));
  // const client = new OpenAIClient(getURL(RESOURCE_NAME), new OpenAIKeyCredential(secret));

  return client;
}

export function getOpenAIURL(resourceName: string): string {
  return `https://${resourceName}.openai.azure.com/`;
}

export async function getVaultSecret(secretName: string): Promise<KeyVaultSecret> {
  const credential = new DefaultAzureCredential();
  const vault = new SecretClient(VAULT_ADDR, credential);
  const secret = await vault.getSecret(secretName);
  return secret;
}
