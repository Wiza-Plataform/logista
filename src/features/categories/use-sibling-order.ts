'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import type { DragEvent, KeyboardEvent } from 'react';

import { droppedOn, movedBy } from './category-tree';

const MOVE_UP = -1;
const MOVE_DOWN = 1;
const STAY = 0;

export interface DragBindings {
  readonly draggable: true;
  readonly onDragStart: (event: DragEvent<HTMLElement>) => void;
  readonly onDragEnd: () => void;
  readonly onDragOver: (event: DragEvent<HTMLElement>) => void;
  readonly onDrop: (event: DragEvent<HTMLElement>) => void;
}

export type GripKeyHandler = (event: KeyboardEvent<HTMLButtonElement>) => void;

function offsetOf(key: string): number {
  if (key === 'ArrowUp') return MOVE_UP;
  if (key === 'ArrowDown') return MOVE_DOWN;
  return STAY;
}

export function useSiblingOrder(
  categoryUlids: readonly string[],
  onReorder: (categoryUlids: readonly string[]) => void,
) {
  const [draggedUlid, setDraggedUlid] = useState<string | null>(null);
  const movedGrip = useRef<HTMLButtonElement | null>(null);

  useLayoutEffect(() => {
    movedGrip.current?.focus();
    movedGrip.current = null;
  });

  function dragBindingsFor(categoryUlid: string): DragBindings {
    return {
      draggable: true,
      onDragStart: (event) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', categoryUlid);
        setDraggedUlid(categoryUlid);
      },
      onDragEnd: () => {
        setDraggedUlid(null);
      },
      onDragOver: (event) => {
        if (draggedUlid !== null) event.preventDefault();
      },
      onDrop: (event) => {
        if (draggedUlid === null) return;
        event.preventDefault();
        setDraggedUlid(null);
        const reordered = droppedOn(categoryUlids, draggedUlid, categoryUlid);
        if (reordered !== null) onReorder(reordered);
      },
    };
  }

  function keyDownFor(categoryUlid: string): GripKeyHandler {
    return (event) => {
      const offset = offsetOf(event.key);
      if (offset === STAY) return;
      event.preventDefault();
      const reordered = movedBy(categoryUlids, categoryUlid, offset);
      if (reordered === null) return;
      movedGrip.current = event.currentTarget;
      onReorder(reordered);
    };
  }

  return { draggedUlid, dragBindingsFor, keyDownFor };
}
