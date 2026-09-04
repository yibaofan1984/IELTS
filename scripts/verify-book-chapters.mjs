import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const projectRoot = path.resolve(import.meta.dirname, '..');
const modulePath = path.join(projectRoot, 'app', 'book-chapters.ts');
const source = fs.readFileSync(modulePath, 'utf8');
const output = ts.transpileModule(source, {
  compilerOptions: {
    esModuleInterop: true,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
  fileName: modulePath,
}).outputText;

const jsonModules = new Map([
  ['./vocabulary.json', 'vocabulary.json'],
  ['./word-parts-of-speech.json', 'word-parts-of-speech.json'],
].map(([specifier, file]) => [specifier, JSON.parse(fs.readFileSync(path.join(projectRoot, 'app', file), 'utf8'))]));

const compiledModule = { exports: {} };
const localRequire = (specifier) => {
  if (jsonModules.has(specifier)) return jsonModules.get(specifier);
  throw new Error(`Unexpected import in book chapter verifier: ${specifier}`);
};
new Function('require', 'module', 'exports', output)(localRequire, compiledModule, compiledModule.exports);

const { chapters } = compiledModule.exports;
if (!Array.isArray(chapters) || chapters.length !== 22) {
  throw new Error(`Expected 22 IELTS chapters, found ${chapters?.length ?? 0}`);
}

const counts = chapters.map((chapter) => chapter.words.length);
const total = counts.reduce((sum, count) => sum + count, 0);
const expectedCounts = [240, 112, 166, 75, 389, 110, 79, 61, 166, 149, 113, 167, 131, 130, 149, 166, 104, 206, 121, 263, 415, 46];
if (counts.some((count, index) => count !== expectedCounts[index])) {
  throw new Error(`Unexpected audited chapter counts: ${counts.join(', ')}`);
}
console.log(JSON.stringify({ counts, total }));
