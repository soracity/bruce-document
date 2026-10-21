/** 工程③ IMP-04: DISPLAY-01に基づく独立実装。 */
import { Injectable } from '@angular/core';
type MeasureEntry = { measure?: () => number; listeners: Set<() => void> };

@Injectable({ providedIn: 'root' })
export class LayoutMetricsService {
  private readonly entries = new WeakMap<HTMLElement, MeasureEntry>();

  private ensure(element: HTMLElement): MeasureEntry {
    let entry = this.entries.get(element);
    if (!entry) {
      entry = { listeners: new Set() };
      this.entries.set(element, entry);
    }
    return entry;
  }
  private cleanup(element: HTMLElement, entry: MeasureEntry): void {
    if (!entry.measure && entry.listeners.size === 0) this.entries.delete(element);
  }
  register(element: HTMLElement, measure: () => number): () => void {
    const entry = this.ensure(element);
    if (entry.measure) throw new Error('BRUCE_LAYOUT_MEASURE_DUPLICATE');
    entry.measure = measure;
    return () => {
      if (entry.measure === measure) entry.measure = undefined;
      this.cleanup(element, entry);
    };
  }
  requiredWidth(element: HTMLElement): number | undefined {
    const entry = this.entries.get(element);
    if (!entry?.measure) return undefined;
    const width = entry.measure();
    if (!Number.isFinite(width) || width < 0) throw new Error('BRUCE_LAYOUT_MEASURE_VALUE');
    return width;
  }
  invalidate(element: HTMLElement): void {
    const entry = this.entries.get(element);
    if (!entry) return;
    for (const listener of [...entry.listeners]) listener();
  }
  watch(elements: readonly HTMLElement[], callback: () => void): () => void {
    for (const element of elements) this.ensure(element).listeners.add(callback);
    return () => {
      for (const element of elements) {
        const entry = this.entries.get(element);
        if (!entry) continue;
        entry.listeners.delete(callback);
        this.cleanup(element, entry);
      }
    };
  }
}
