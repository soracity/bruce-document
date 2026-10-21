/** 工程③ IMP-10 部分実装: UIIMPL-04のDATE暦日解析。日時変換は未実装。 */
export type DateReason = 'incomplete' | 'invalidDate' | 'invalidUtc' | 'invalidLocalValue' | 'nonexistentLocalTime' | 'outOfRange' | 'invalidStoredValue';
export type DateFailure = { reason: DateReason; raw: string };
export type Result<T> = { ok: true; value: T } | { ok: false; error: DateFailure };
export type DateParts = { year: number; month: number; day: number };

const fail = (raw: string, reason: DateReason): Result<never> => ({ ok: false, error: { reason, raw } });
export function parseDate(raw: string): Result<DateParts> {
  const match = /^([0-9]{4,})-([0-9]{2})-([0-9]{2})$/.exec(raw);
  if (!match) return fail(raw, 'incomplete');
  const year = Number(match[1]), month = Number(match[2]), day = Number(match[3]);
  if (!Number.isSafeInteger(year) || year < 1) return fail(raw, 'invalidDate');
  if (month < 1 || month > 12) return fail(raw, 'invalidDate');
  const leap = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day < 1 || day > days[month - 1]!) return fail(raw, 'invalidDate');
  return { ok: true, value: { year, month, day } };
}

export type LocalParts = DateParts & { hour: number; minute: number; second: number; millisecond: number };

export function parseLocal(raw: string): Result<LocalParts> {
  const match = /^([0-9]{4,}-[0-9]{2}-[0-9]{2})T([0-9]{2}):([0-9]{2})(?::([0-9]{2})(?:\\.([0-9]{1,3}))?)?$/.exec(raw);
  if (!match) return fail(raw, 'incomplete');
  const date = parseDate(match[1]!);
  if (!date.ok) return fail(raw, date.error.reason);
  const hour = Number(match[2]), minute = Number(match[3]), second = Number(match[4] ?? '0');
  const millisecond = Number((match[5] ?? '').padEnd(3, '0') || '0');
  if (hour > 23 || minute > 59 || second > 59) return fail(raw, 'invalidLocalValue');
  return { ok: true, value: { ...date.value, hour, minute, second, millisecond } };
}
