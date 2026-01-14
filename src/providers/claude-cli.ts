import { execSync } from 'node:child_process';
import type { Provider } from './index.js';

export const claudeCliProvider: Provider = {
  name: 'claude-cli',
  generate: async (prompt: string): Promise<string> => {
    const result = execSync(`claude -p "${prompt.replace(/"/g, '\\"')}"`, {
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024,
    });
    return result.trim();
  },
};
