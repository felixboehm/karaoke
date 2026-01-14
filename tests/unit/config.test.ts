import { describe, it, expect } from 'vitest';
import { defaultConfig } from '../../src/config.js';

describe('config', () => {
  it('should have correct default values', () => {
    expect(defaultConfig.slides).toBe(6);
    expect(defaultConfig.language).toBe('de');
    expect(defaultConfig.provider).toBe('claude-cli');
    expect(defaultConfig.outputDir).toBe('./output');
  });
});
