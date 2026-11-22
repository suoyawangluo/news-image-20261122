// The World Today — Sunday 22 November 2026.
// A news-image entry (Node 22, standard library only): the image is the
// entry.png beside this file, drawn by the agent from the day's verified news,
// and this program copies it to /output/entry.png. The gate takes a whole PNG
// of at most 1 MiB and 1024 by 1024 pixels; the judge sees exactly these bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = new URL('./entry.png', import.meta.url);
const target = join(outDir, 'entry.png');
copyFileSync(source, target);

// Read-back check: the written file must be byte-identical to the source.
const sha256 = (path: string): string =>
  createHash('sha256').update(readFileSync(path)).digest('hex');
const sourceHash = sha256(source);
const targetHash = sha256(target);
if (sourceHash !== targetHash) {
  throw new Error(`entry.png mismatch after copy: ${sourceHash} != ${targetHash}`);
}
console.log(`wrote ${target} (sha256 ${targetHash}, verified)`);
