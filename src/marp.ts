import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export interface MarpOptions {
  outputDir: string;
  filename?: string;
}

export async function exportToPdf(
  markdown: string,
  options: MarpOptions
): Promise<{ mdPath: string; pdfPath: string }> {
  const filename = options.filename ?? 'slides';
  const mdPath = join(options.outputDir, `${filename}.md`);
  const pdfPath = join(options.outputDir, `${filename}.pdf`);

  mkdirSync(options.outputDir, { recursive: true });
  writeFileSync(mdPath, markdown, 'utf-8');

  execSync(`npx @marp-team/marp-cli "${mdPath}" --pdf -o "${pdfPath}"`, {
    encoding: 'utf-8',
    stdio: 'inherit',
  });

  return { mdPath, pdfPath };
}
