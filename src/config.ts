export interface Config {
  topic: string;
  slides: number;
  language: 'de' | 'en';
  provider: 'claude-cli' | 'anthropic' | 'openai' | 'ollama' | 'mock';
  outputDir: string;
}

export const defaultConfig: Omit<Config, 'topic'> = {
  slides: 6,
  language: 'de',
  provider: 'claude-cli',
  outputDir: './output',
};
