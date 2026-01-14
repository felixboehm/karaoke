import type { Provider } from './index.js';

const mockMarkdown = `---
marp: true
theme: default
paginate: true
---

# Mock Presentation

This is a mock presentation for testing.

---

# Slide 2

- Point 1
- Point 2

![bg right](https://picsum.photos/800/600?random=1)

---

# Slide 3

Some content here.

---

# Thank You

Questions?
`;

export const mockProvider: Provider = {
  name: 'mock',
  generate: async (_prompt: string): Promise<string> => {
    return mockMarkdown;
  },
};
