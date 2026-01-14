export interface Provider {
  name: string;
  generate(prompt: string): Promise<string>;
}

export type ProviderName = 'claude-cli' | 'anthropic' | 'openai' | 'ollama' | 'mock';
