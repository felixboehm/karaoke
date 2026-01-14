import { describe, it, expect } from 'vitest';
import { generatePresentation } from '../../src/generator.js';
import type { Config } from '../../src/config.js';

describe('pipeline', () => {
  const config: Config = {
    topic: 'Integration Test',
    slides: 4,
    language: 'en',
    provider: 'mock',
    outputDir: './test-output',
  };

  it('should generate valid Marp markdown with mock provider', async () => {
    const markdown = await generatePresentation(config);

    expect(markdown).toContain('marp: true');
    expect(markdown).toContain('theme: default');
    expect(markdown).toContain('paginate: true');
  });

  it('should contain slide separators', async () => {
    const markdown = await generatePresentation(config);
    const slideSeparators = markdown.split('---').length - 1;
    expect(slideSeparators).toBeGreaterThan(0);
  });

  it('should throw for unknown provider', async () => {
    const badConfig = { ...config, provider: 'unknown' as Config['provider'] };
    await expect(generatePresentation(badConfig)).rejects.toThrow('Unknown provider');
  });
});
