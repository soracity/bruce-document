/**
 * 工程③ IMP-38 / 29章 RELEASE-01
 * pure validation core: manifest/requested/API-verified evidence contract.
 * fetchVerifiedRun / ZIP bytes verification / network API の実装済み証拠ではない。
 */
const FIELDS = [
  'commit','project','configuration','runId','runAttempt','artifactId',
  'archiveSha256','artifactSha256','lockfileSha256','layout','angular',
  'designCommit','acgCommit'
];
const SHAS = ['commit','designCommit','acgCommit'];
const DIGESTS = ['archiveSha256','artifactSha256','lockfileSha256'];
const DECIMAL_IDS = ['runId','artifactId'];

function fail(field, reason) {
  throw new Error('BRUCE_RELEASE_EVIDENCE: ' + field + ': ' + reason);
}
function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function nonblank(value) {
  return typeof value === 'string' && value.trim().length > 0;
}
function requireFields(value, fields, where) {
  if (!isRecord(value)) fail(where, 'expected object');
  for (const field of fields) {
    if (!Object.prototype.hasOwnProperty.call(value, field)) fail(where + '.' + field, 'missing');
  }
}
function checkEvidence(value, where) {
  requireFields(value, FIELDS, where);
  for (const field of SHAS) {
    if (typeof value[field] !== 'string' || !/^[a-fA-F0-9]{40}$/.test(value[field])) {
      fail(where + '.' + field, 'expected 40 hex characters');
    }
  }
  for (const field of DIGESTS) {
    if (typeof value[field] !== 'string' || !/^[a-fA-F0-9]{64}$/.test(value[field])) {
      fail(where + '.' + field, 'expected 64 hex characters');
    }
  }
  for (const field of DECIMAL_IDS) {
    if (typeof value[field] !== 'string' || !/^[0-9]+$/.test(value[field])) {
      fail(where + '.' + field, 'expected nonempty decimal string');
    }
  }
  if (!Number.isSafeInteger(value.runAttempt) || value.runAttempt < 1) {
    fail(where + '.runAttempt', 'expected positive integer');
  }
  for (const field of ['project','configuration']) {
    if (!nonblank(value[field])) fail(where + '.' + field, 'required nonempty string');
  }
  for (const field of ['layout','angular']) {
    if (value[field] !== 'success') fail(where + '.' + field, 'expected success');
  }
}
function checkRequested(requested) {
  const fields = ['commit','project','configuration','artifactSha256'];
  requireFields(requested, fields, 'requested');
  if (typeof requested.commit !== 'string' || !/^[a-fA-F0-9]{40}$/.test(requested.commit)) {
    fail('requested.commit', 'expected 40 hex characters');
  }
  if (typeof requested.artifactSha256 !== 'string' ||
      !/^[a-fA-F0-9]{64}$/.test(requested.artifactSha256)) {
    fail('requested.artifactSha256', 'expected 64 hex characters');
  }
  for (const field of ['project','configuration']) {
    if (!nonblank(requested[field])) fail('requested.' + field, 'required nonempty string');
  }
}

/** 一致の検証のみ。verifiedRun は必ずAPI照合済みのtrusted sourceから渡す。 */
export function assertReleaseEvidence(manifest, requested, verifiedRun) {
  checkEvidence(manifest, 'manifest');
  checkEvidence(verifiedRun, 'verifiedRun');
  checkRequested(requested);
  for (const field of FIELDS) {
    if (manifest[field] !== verifiedRun[field]) {
      fail(field, 'manifest and verifiedRun mismatch');
    }
  }
  for (const field of ['commit','project','configuration','artifactSha256']) {
    if (manifest[field] !== requested[field] || verifiedRun[field] !== requested[field]) {
      fail(field, 'requested mismatch');
    }
  }
}
