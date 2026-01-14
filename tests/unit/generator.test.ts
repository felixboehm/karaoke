import { describe, it, expect } from 'vitest';
import { buildPrompt } from '../../src/generator.js';
import type { Config } from '../../src/config.js';

describe('generator', () => {
  const baseConfig: Config = {
    topic: 'Test Topic',
    slides: 5,
    language: 'de',
    provider: 'mock',
    outputDir: './output',
  };

  describe('buildPrompt', () => {
    it('should include the topic', () => {
      const prompt = buildPrompt(baseConfig);
      expect(prompt).toContain('Test Topic');
    });

    it('should include the slide count', () => {
      const prompt = buildPrompt({ ...baseConfig, slides: 8 });
      expect(prompt).toContain('8 slides');
    });

    it('should use German instructions for de language', () => {
      const prompt = buildPrompt({ ...baseConfig, language: 'de' });
      expect(prompt).toContain('auf Deutsch');
    });

    it('should use English instructions for en language', () => {
      const prompt = buildPrompt({ ...baseConfig, language: 'en' });
      expect(prompt).toContain('in English');
    });

    it('should include Marp frontmatter example', () => {
      const prompt = buildPrompt(baseConfig);
      expect(prompt).toContain('marp: true');
    });

    it('should mention PowerPoint Karaoke', () => {
      const prompt = buildPrompt(baseConfig);
      expect(prompt).toContain('PowerPoint Karaoke');
    });
  });
});
