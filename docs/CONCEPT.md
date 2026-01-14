# PowerPoint Karaoke Generator - Konzept

## Überblick

Ein CLI-Tool, das zu einem beliebigen Topic eine Präsentation generiert und als PDF exportiert.

## Workflow

```
Topic (Input) → LLM Prompt → Markdown (Marp-Format) → PDF Export
```

## Tech Stack

| Komponente | Technologie |
|------------|-------------|
| **Sprache** | TypeScript |
| **Runtime** | Node.js |
| **Präsentation** | Marp CLI (`@marp-team/marp-cli`) |
| **LLM (Default)** | Claude CLI (`claude -p`) |
| **LLM (Alternativ)** | Anthropic SDK, OpenAI SDK, Ollama |
| **Bilder** | picsum.photos (Platzhalter) |
| **Package Manager** | npm |

## Konfigurierbare Parameter

```typescript
interface Config {
  topic: string;           // Pflicht
  slides?: number;         // Default: 6
  language?: 'de' | 'en';  // Default: 'de'
  provider?: 'claude-cli' | 'anthropic' | 'openai' | 'ollama';
  outputDir?: string;      // Default: './output'
}
```

## CLI Interface

```bash
# Minimal
npx karaoke "Quantenphysik"

# Mit Optionen
npx karaoke "Blockchain" --slides 8 --lang en --provider openai
```

## Projektstruktur

```
src/
├── index.ts              # CLI Entry Point
├── config.ts             # Konfiguration & Defaults
├── providers/
│   ├── index.ts          # Provider Interface
│   ├── claude-cli.ts     # claude -p Aufruf
│   ├── anthropic.ts      # Anthropic SDK
│   ├── openai.ts         # OpenAI SDK
│   └── ollama.ts         # Ollama lokaler Aufruf
├── generator.ts          # Prompt-Logik
├── marp.ts               # Marp PDF-Export
└── prompt.txt            # System-Prompt Template
```

## Marp Markdown-Format

Marp verwendet Standard-Markdown mit YAML-Frontmatter und `---` als Slide-Trenner:

```markdown
---
marp: true
theme: default
paginate: true
---

# Slide 1: Titel

Das ist der Inhalt

---

# Slide 2: Nächstes Thema

- Bullet Point 1
- Bullet Point 2

![bg right](https://picsum.photos/800/600)

---

# Slide 3: Fazit

Zusammenfassung
```

## LLM-Prompt Strategie

Der Prompt sollte:
- Marp-Syntax vorgeben (inkl. Frontmatter)
- Anzahl Slides als Parameter erhalten
- Sprache als Parameter erhalten
- Absurde/überraschende Inhalte fördern (Karaoke-Faktor)
- Bilder via picsum.photos URLs einfügen

## Implementierungsschritte

1. Projekt-Setup (package.json, tsconfig.json)
2. CLI-Argument-Parsing implementieren
3. Provider-Interface definieren
4. Claude CLI Provider implementieren (Default)
5. Prompt-Template erstellen
6. Marp PDF-Export integrieren
7. Weitere Provider hinzufügen (optional)
8. Tests schreiben

## Dependencies

```json
{
  "dependencies": {
    "@marp-team/marp-cli": "^3.x",
    "commander": "^12.x"
  },
  "devDependencies": {
    "@types/node": "^20.x",
    "typescript": "^5.x"
  }
}
```
