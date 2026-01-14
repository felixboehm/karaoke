import { describe, it, expect } from 'vitest';
import { mockProvider } from '../../../src/providers/mock.js';

describe('mockProvider', () => {
  it('should have correct name', () => {
    expect(mockProvider.name).toBe('mock');
  });

  it('should return valid Marp markdown', async () => {
    const result = await mockProvider.generate('any prompt');
    expect(result).toContain('marp: true');
    expect(result).toContain('---');
  });

  it('should include picsum.photos image', async () => {
    const result = await mockProvider.generate('any prompt');
    expect(result).toContain('picsum.photos');
  });
});
