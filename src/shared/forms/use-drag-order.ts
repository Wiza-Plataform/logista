'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import type { DragEvent, KeyboardEvent } from 'react';

import { droppedOn, movedBy } from './drag-order';

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

export function useDragOrder(ids: readonly string[], onReorder: (ids: readonly string[]) => void) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const movedGrip = useRef<HTMLButtonElement | null>(null);

  useLayoutEffect(() => {
    movedGrip.current?.focus();
    movedGrip.current = null;
  });

  function dragBindingsFor(id: string): DragBindings {
    return {
      draggable: true,
      onDragStart: (event) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', id);
        setDraggedId(id);
      },
      onDragEnd: () => {
        setDraggedId(null);
      },
      onDragOver: (event) => {
        if (draggedId !== null) event.preventDefault();
      },
      onDrop: (event) => {
        if (draggedId === null) return;
        event.preventDefault();
        setDraggedId(null);
        const reordered = droppedOn(ids, draggedId, id);
        if (reordered !== null) onReorder(reordered);
      },
    };
  }

  function keyDownFor(id: string): GripKeyHandler {
    return (event) => {
      const offset = offsetOf(event.key);
      if (offset === STAY) return;
      event.preventDefault();
      const reordered = movedBy(ids, id, offset);
      if (reordered === null) return;
      movedGrip.current = event.currentTarget;
      onReorder(reordered);
    };
  }

  return { draggedId, dragBindingsFor, keyDownFor };
}
