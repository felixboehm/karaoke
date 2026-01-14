import type { Config } from './config.js';
import type { Provider } from './providers/index.js';
import { claudeCliProvider } from './providers/claude-cli.js';
import { mockProvider } from './providers/mock.js';

const providers: Record<string, Provider> = {
  'claude-cli': claudeCliProvider,
  mock: mockProvider,
};

export function buildPrompt(config: Config): string {
  const langInstructions =
    config.language === 'de'
      ? 'Schreibe die Präsentation auf Deutsch.'
      : 'Write the presentation in English.';

  return `Generate a Marp presentation about "${config.topic}".

Requirements:
- Create exactly ${config.slides} slides
- ${langInstructions}
- Use absurd, surprising, and humorous content (this is for PowerPoint Karaoke)
- Include random placeholder images from picsum.photos (e.g., https://picsum.photos/800/600?random=N)
- Use varied slide layouts (title slides, bullet points, images, quotes)
- IMPORTANT: Never place text over full background images. Always use "bg left" or "bg right" to keep text on white background for readability

Output format:
- Start with YAML frontmatter: marp: true, theme: default, paginate: true
- Separate slides with ---
- Use markdown formatting
- Only output the markdown, no explanations

Example structure:
---
marp: true
theme: default
paginate: true
---

# Title

Content

---

# Next Slide

- Bullet point

![bg right](https://picsum.photos/800/600?random=1)
`;
}

export async function generatePresentation(config: Config): Promise<string> {
  const provider = providers[config.provider];
  if (!provider) {
    throw new Error(`Unknown provider: ${config.provider}`);
  }

  const prompt = buildPrompt(config);
  return provider.generate(prompt);
}
