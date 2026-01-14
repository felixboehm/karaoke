# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PowerPoint Karaoke Generator - A CLI tool that generates random presentations from any topic using LLM and exports to PDF via Marp.

## Commands

```bash
# Build
npm run build

# Run tests
npm run test              # All tests
npm run test:unit         # Unit tests only
npm run test:integration  # Integration tests only
npm run test:e2e          # E2E tests (uses mock provider)

# Run single test
npx vitest run tests/unit/config.test.ts

# Generate presentation
npx karaoke "Topic" --slides 6 --lang de --provider claude-cli
```

## Architecture

**Pipeline:** Topic → LLM Provider → Marp Markdown → PDF

**Key Components:**
- `src/providers/` - LLM provider implementations (claude-cli is default, calls `claude -p`)
- `src/generator.ts` - Builds prompts with topic, slide count, language
- `src/marp.ts` - Converts generated Markdown to PDF via Marp CLI

**Provider Interface:** All providers implement `generate(prompt: string): Promise<string>` returning Marp-formatted Markdown.

**Marp Format:** Slides use `---` separators, YAML frontmatter with `marp: true`, and picsum.photos for placeholder images.

## Testing

Tests use Vitest with a mock provider for deterministic results. LLM responses are mocked via `tests/fixtures/sample-output.md` to avoid API costs in CI.
