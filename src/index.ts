#!/usr/bin/env node

import { program } from 'commander';
import { defaultConfig, type Config } from './config.js';
import { generatePresentation } from './generator.js';
import { exportToPdf } from './marp.js';

program
  .name('karaoke')
  .description('Generate random presentations for PowerPoint Karaoke')
  .version('0.1.0')
  .argument('<topic>', 'Topic for the presentation')
  .option('-s, --slides <number>', 'Number of slides', String(defaultConfig.slides))
  .option('-l, --lang <language>', 'Language (de or en)', defaultConfig.language)
  .option(
    '-p, --provider <provider>',
    'LLM provider (claude-cli, anthropic, openai, ollama, mock)',
    defaultConfig.provider
  )
  .option('-o, --output <dir>', 'Output directory', defaultConfig.outputDir)
  .option('--md-only', 'Only generate markdown, skip PDF export', false)
  .action(async (topic: string, options) => {
    const config: Config = {
      topic,
      slides: parseInt(options.slides, 10),
      language: options.lang as 'de' | 'en',
      provider: options.provider,
      outputDir: options.output,
    };

    console.log(`Generating presentation about "${config.topic}"...`);
    console.log(`  Slides: ${config.slides}`);
    console.log(`  Language: ${config.language}`);
    console.log(`  Provider: ${config.provider}`);

    try {
      const markdown = await generatePresentation(config);

      if (options.mdOnly) {
        console.log('\n--- Generated Markdown ---\n');
        console.log(markdown);
        return;
      }

      console.log('\nExporting to PDF...');
      const { mdPath, pdfPath } = await exportToPdf(markdown, {
        outputDir: config.outputDir,
      });

      console.log(`\nDone!`);
      console.log(`  Markdown: ${mdPath}`);
      console.log(`  PDF: ${pdfPath}`);
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();
