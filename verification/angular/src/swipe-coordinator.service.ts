/** 工程③ IMP-24: SWIPE-04から独立実装。root提供はしない。 */
import { Injectable } from '@angular/core';

export interface SwipeActionsOwner {
  close(): void;
}

@Injectable()
export class SwipeCoordinator {
  private active: SwipeActionsOwner | undefined;

  claim(owner: SwipeActionsOwner): boolean {
    if (this.active === owner) return true;
    const previous = this.active;
    this.active = owner;
    previous?.close();
    return this.active === owner;
  }

  release(owner: SwipeActionsOwner): void {
    if (this.active === owner) this.active = undefined;
  }
}
