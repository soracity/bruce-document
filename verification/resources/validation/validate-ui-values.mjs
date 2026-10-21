/**
 * 工程③ IMP-37 / 29章 ACGIMPL-02 Node-side JSON validation process.
 * Java bridge ProcessBuilder/timeout/pipe/cleanup is separately unverified.
 */
import { createRequire } from 'node:module';
import { isAbsolute } from 'node:path';

const require = createRequire(import.meta.url);
function errorExit(message) {
  process.stderr.write(String(message).replace(/[\r\n]+/g, ' ') + '\n');
  process.exitCode = 2;
}
function record(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function checkRequest(request) {
  if (!record(request)) throw new Error('request must be object');
  if (request.version !== 1) throw new Error('unsupported protocol version');
  if (request.mode !== 'regex' && request.mode !== 'syntax') throw new Error('invalid mode');
  if (typeof request.typescriptModulePath !== 'string' ||
      !isAbsolute(request.typescriptModulePath)) throw new Error('invalid typescriptModulePath');
  if (!Array.isArray(request.items)) throw new Error('items must be array');
  for (const item of request.items) {
    if (!record(item) || typeof item.file !== 'string') throw new Error('invalid item.file');
    if (request.mode === 'regex') {
      if (typeof item.physicalName !== 'string' || typeof item.source !== 'string') {
        throw new Error('invalid regex item');
      }
    } else if (typeof item.source !== 'string') {
      throw new Error('invalid syntax item');
    }
  }
}
async function main() {
  try {
    let input = '';
    for await (const chunk of process.stdin) input += chunk.toString('utf8');
    const request = JSON.parse(input);
    checkRequest(request);
    // Never eval/import incoming source. TypeScript module is a trusted absolute local path.
    const ts = require(request.typescriptModulePath);
    if (!ts || typeof ts.createSourceFile !== 'function') {
      throw new Error('typescript module missing createSourceFile');
    }
    for (let index = 0; index < request.items.length; index++) {
      const item = request.items[index];
      let problem = null;
      if (request.mode === 'regex') {
        try { new RegExp(item.source); }
        catch (e) { problem = e instanceof Error ? e.message : String(e); }
      } else {
        const sf = ts.createSourceFile(item.file, item.source,
          ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
        const diagnostic = sf.parseDiagnostics[0];
        if (diagnostic) {
          problem = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        }
      }
      if (problem !== null) {
        process.stdout.write(JSON.stringify({ ok: false, index, message: problem }) + '\n');
        return;
      }
    }
    process.stdout.write('{"ok":true}\n');
  } catch (error) {
    errorExit(error instanceof Error ? error.message : String(error));
  }
}
await main();
