import { describe, it, expect } from 'vitest';
import { assertReleaseEvidence } from '../../tools/release-evidence.mjs';

const shaA = 'a'.repeat(40), shaB = 'b'.repeat(40), shaC = 'c'.repeat(40);
const sumA = '1'.repeat(64), sumB = '2'.repeat(64), sumC = '3'.repeat(64);
const baseline = () => ({
  commit: shaA, project: 'Bruce', configuration: 'production',
  runId: '123456', runAttempt: 1, artifactId: '87654',
  archiveSha256: sumA, artifactSha256: sumB, lockfileSha256: sumC,
  layout: 'success', angular: 'success', designCommit: shaB, acgCommit: shaC,
});
const requested = () => ({
  commit: shaA, project: 'Bruce', configuration: 'production', artifactSha256: sumB,
});

describe('IMP-38 / RELEASE-01 assertReleaseEvidence', () => {
  it('accepts a complete three-way matching manifest and trusted run', () => {
    expect(() => assertReleaseEvidence(baseline(), requested(), baseline())).not.toThrow();
  });

  it.each(['commit','project','configuration','artifactSha256'] as const)(
    'rejects a different requested %s even if the others match', field => {
      const r: Record<string, unknown> = requested();
      r[field] = field === 'commit' ? 'f'.repeat(40) :
        field === 'artifactSha256' ? 'f'.repeat(64) : 'different';
      expect(() => assertReleaseEvidence(baseline(), r, baseline())).toThrow('BRUCE_RELEASE_EVIDENCE');
    }
  );

  it.each(['runId','runAttempt','artifactId','archiveSha256','lockfileSha256','designCommit','acgCommit'] as const)(
    'rejects a different trusted-run %s even with matching requested fields', field => {
      const run: Record<string, unknown> = baseline();
      run[field] = field === 'runAttempt' ? 2 :
        field === 'runId' || field === 'artifactId' ? '54321' :
        field === 'archiveSha256' || field === 'lockfileSha256' ? 'f'.repeat(64) :
        'f'.repeat(40);
      expect(() => assertReleaseEvidence(baseline(), requested(), run)).toThrow(field);
    }
  );

  it.each(['layout','angular'] as const)('rejects false success flag for %s', field => {
    const m: Record<string, unknown> = baseline();
    m[field] = 'failure';
    expect(() => assertReleaseEvidence(m, requested(), baseline())).toThrow(field);
  });

  it.each([0,-1,1.5,NaN,Infinity,'1',null] as const)(
    'rejects invalid run attempt %s', value => {
      const m = { ...baseline(), runAttempt: value };
      expect(() => assertReleaseEvidence(m, requested(), baseline())).toThrow('runAttempt');
    }
  );

  it.each(['commit','designCommit','acgCommit'] as const)(
    'rejects invalid 40-digit source identity %s', field => {
      const m: Record<string, unknown> = baseline();
      m[field] = 'invalid';
      expect(() => assertReleaseEvidence(m, requested(), baseline())).toThrow(field);
    }
  );

  it.each(['archiveSha256','artifactSha256','lockfileSha256'] as const)(
    'rejects invalid 64-digit content digest %s', field => {
      const m: Record<string, unknown> = baseline();
      m[field] = '0'.repeat(63);
      expect(() => assertReleaseEvidence(m, requested(), baseline())).toThrow(field);
    }
  );

  it.each(['runId','artifactId'] as const)('rejects non-decimal %s', field => {
    const m: Record<string, unknown> = baseline();
    m[field] = '12e3';
    expect(() => assertReleaseEvidence(m, requested(), baseline())).toThrow(field);
  });

  it('rejects missing fields, empty project, empty configuration and invalid objects', () => {
    const missing: Record<string, unknown> = baseline();
    delete missing.acgCommit;
    expect(() => assertReleaseEvidence(missing, requested(), baseline())).toThrow('acgCommit');
    expect(() => assertReleaseEvidence({ ...baseline(), project: ' ' }, requested(), baseline())).toThrow('project');
    expect(() => assertReleaseEvidence(baseline(), { ...requested(), configuration: '' }, baseline())).toThrow('configuration');
    expect(() => assertReleaseEvidence(null, requested(), baseline())).toThrow('manifest');
    expect(() => assertReleaseEvidence(baseline(), requested(), [])).toThrow('verifiedRun');
  });
});
