/** 工程③ IMP-05 の LayoutRowUtil: DISPLAY-03から独立実装。 */
export type LayoutMetric = { element: HTMLElement; required: number; weight: number };
export type LayoutRow = { items: LayoutMetric[]; widths: number[] };

function checkNonnegative(value: number): void {
  if (!Number.isFinite(value) || value < 0) throw new Error('BRUCE_LAYOUT_VALUE');
}
function widths(items: readonly LayoutMetric[], available: number, gap: number): number[] {
  const usable = Math.max(0, available - gap * (items.length - 1));
  const maxWeight = Math.max(...items.map(item => item.weight));
  const normalized = items.map(item => item.weight / maxWeight);
  const sum = normalized.reduce((a, b) => a + b, 0);
  const result: number[] = [];
  let allocated = 0;
  for (let i = 0; i < items.length - 1; i++) {
    const width = usable * normalized[i]! / sum;
    result.push(width);
    allocated += width;
  }
  result.push(Math.max(0, usable - allocated));
  return result;
}
export class LayoutRowUtil {
  static partition(items: readonly LayoutMetric[], available: number, gap: number): LayoutRow[] {
    checkNonnegative(available);
    checkNonnegative(gap);
    for (const item of items) {
      checkNonnegative(item.required);
      if (!Number.isFinite(item.weight) || item.weight <= 0) throw new Error('BRUCE_LAYOUT_VALUE');
    }
    if (items.length === 0 || available === 0) return [];
    const rows: LayoutRow[] = [];
    let current: LayoutMetric[] = [];
    const commit = () => {
      if (current.length > 0) rows.push({ items: current, widths: widths(current, available, gap) });
    };
    for (const item of items) {
      const candidate = [...current, item];
      const candidateWidths = widths(candidate, available, gap);
      const fits = gap * (candidate.length - 1) <= available &&
        candidate.every((metric, index) =>
          candidateWidths[index]! + 1e-7 >= Math.min(metric.required, available));
      if (current.length > 0 && !fits) {
        commit();
        current = [item];
      } else {
        current = candidate;
      }
    }
    commit();
    return rows;
  }
}
