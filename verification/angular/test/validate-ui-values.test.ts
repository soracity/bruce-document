import { describe, expect, it } from 'vitest';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const tsModule = require.resolve('typescript');
const script = fileURLToPath(new URL('../../resources/validation/validate-ui-values.mjs', import.meta.url));
type Mode = 'regex' | 'syntax';
function run(mode: Mode, items: Record<string, unknown>[]) {
  const request = { version: 1, mode, typescriptModulePath: tsModule, items };
  return spawnSync(process.execPath, [script], {
    input: JSON.stringify(request), encoding: 'utf8', timeout: 5000,
  });
}
function regex(file: string, source: string) { return { file, physicalName: 'testField', source }; }
function syntax(file: string, source: string) { return { file, source }; }

describe('IMP-37 ACGIMPL-02 Node validation protocol', () => {
  it('accepts valid JavaScript regular expression sources', () => {
    const r = run('regex', [regex('a.md', '^[0-9]+$'),regex('b.md', '[A-Za-z\\d]+')]);
    expect(r.status).toBe(0);
    expect(r.stderr).toBe('');
    expect(JSON.parse(r.stdout)).toEqual({ ok: true });
  });
  it('returns first invalid regex index as a domain error with exit 0', () => {
    const r = run('regex', [regex('a.md','[abc]+'),regex('b.md','('),regex('c.md','[a]+')]);
    expect(r.status).toBe(0);
    const output = JSON.parse(r.stdout);
    expect(output).toMatchObject({ ok: false, index: 1 });
    expect(output.message).toEqual(expect.any(String));
  });
  it('does not run provided source as JavaScript code', () => {
    const r = run('regex', [regex('a.md', 'process.exit(1)')]);
    expect(r.status).toBe(0);
    expect(JSON.parse(r.stdout)).toEqual({ ok: true });
  });
  it('accepts TypeScript source with Angular-relevant typed class syntax', () => {
    const r = run('syntax',[syntax('src/test.ts','export class Sample { readonly value: string = \'ok\'; }')]);
    expect(r.status).toBe(0);
    expect(JSON.parse(r.stdout)).toEqual({ ok: true });
  });
  it('rejects TypeScript parse diagnostics at the correct index', () => {
    const r = run('syntax', [syntax('a.ts','export const a = 1;'), syntax('b.ts','const x: = ;')]);
    expect(r.status).toBe(0);
    expect(JSON.parse(r.stdout)).toMatchObject({ ok: false, index: 1 });
  });
  it('does not pretend parse success means TypeScript semantic typecheck success', () => {
    const r = run('syntax', [syntax('a.ts','let count: number = "bad-type";')]);
    expect(r.status).toBe(0);
    expect(JSON.parse(r.stdout)).toEqual({ ok: true });
  });
  it.each([
    { version: 2, mode: 'regex', typescriptModulePath: tsModule, items: [] },
    { version: 1, mode: 'bad', typescriptModulePath: tsModule, items: [] },
    { version: 1, mode: 'syntax', typescriptModulePath: 'typescript', items: [] },
    { version: 1, mode: 'regex', typescriptModulePath: tsModule, items: [{}] },
    { version: 1, mode: 'syntax', typescriptModulePath: tsModule, items: [null] },
    { version: 1, mode: 'regex', typescriptModulePath: tsModule, items: null },
  ])('rejects invalid transport request with stderr and exit 2', request => {
    const r = spawnSync(process.execPath,[script],{input:JSON.stringify(request),encoding:'utf8',timeout:5000});
    expect(r.status).toBe(2);
    expect(r.stdout).toBe('');
    expect(r.stderr.trim().split('\n')).toHaveLength(1);
  });
  it('rejects malformed JSON without printing a JavaScript stack trace', () => {
    const r = spawnSync(process.execPath,[script],{input:'{bad',encoding:'utf8',timeout:5000});
    expect(r.status).toBe(2);
    expect(r.stdout).toBe('');
    expect(r.stderr.trim().split('\n')).toHaveLength(1);
  });
  it('rejects an absent TypeScript module with a system error', () => {
    const r = spawnSync(process.execPath,[script],{
      input:JSON.stringify({version:1,mode:'syntax',typescriptModulePath:'/no/such/typescript.js',items:[]}),
      encoding:'utf8',timeout:5000,
    });
    expect(r.status).toBe(2);
    expect(r.stdout).toBe('');
  });
});
