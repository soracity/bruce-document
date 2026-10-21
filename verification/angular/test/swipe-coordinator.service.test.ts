import { describe, expect, it, vi } from 'vitest';
import { SwipeCoordinator, type SwipeActionsOwner } from '../src/swipe-coordinator.service.js';

describe('IMP-24 SwipeCoordinator', () => {
  it('claims an empty coordinator and accepts repeated claim by the same owner', () => {
    const coordinator = new SwipeCoordinator(), owner = { close: vi.fn() };
    expect(coordinator.claim(owner)).toBe(true);
    expect(coordinator.claim(owner)).toBe(true);
    expect(owner.close).not.toHaveBeenCalled();
  });
  it('closes previous owner on replacement', () => {
    const coordinator = new SwipeCoordinator(), old = { close: vi.fn() }, next = { close: vi.fn() };
    coordinator.claim(old);
    expect(coordinator.claim(next)).toBe(true);
    expect(old.close).toHaveBeenCalledTimes(1);
    expect(next.close).not.toHaveBeenCalled();
  });
  it('does not release a different active owner', () => {
    const coordinator = new SwipeCoordinator(), old = { close: vi.fn() }, next = { close: vi.fn() };
    coordinator.claim(old);
    coordinator.claim(next);
    coordinator.release(old);
    expect(coordinator.claim(next)).toBe(true);
    expect(next.close).not.toHaveBeenCalled();
  });
  it('releases active owner for future claims', () => {
    const coordinator = new SwipeCoordinator(), first = { close: vi.fn() }, second = { close: vi.fn() };
    coordinator.claim(first);
    coordinator.release(first);
    expect(coordinator.claim(second)).toBe(true);
    expect(first.close).not.toHaveBeenCalled();
  });
  it('handles reentrant claims during previous close', () => {
    const coordinator = new SwipeCoordinator();
    const third = { close: vi.fn() };
    const first: SwipeActionsOwner = { close: () => { coordinator.claim(third); } };
    const second = { close: vi.fn() };
    coordinator.claim(first);
    expect(coordinator.claim(second)).toBe(false);
    expect(second.close).toHaveBeenCalledTimes(1);
    expect(coordinator.claim(third)).toBe(true);
  });
  it('keeps separate coordinators independent', () => {
    const a = new SwipeCoordinator(), b = new SwipeCoordinator();
    const first = { close: vi.fn() }, second = { close: vi.fn() };
    a.claim(first);
    b.claim(second);
    a.release(first);
    expect(b.claim(second)).toBe(true);
    expect(second.close).not.toHaveBeenCalled();
  });
});
