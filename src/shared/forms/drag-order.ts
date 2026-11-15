export function movedBy(
  ids: readonly string[],
  id: string,
  offset: number,
): readonly string[] | null {
  const from = ids.indexOf(id);
  const to = from + offset;
  if (from === -1 || to < 0 || to >= ids.length) return null;

  const reordered = ids.filter((candidate) => candidate !== id);
  reordered.splice(to, 0, id);
  return reordered;
}

export function droppedOn(
  ids: readonly string[],
  draggedId: string,
  targetId: string,
): readonly string[] | null {
  if (draggedId === targetId) return null;
  return movedBy(ids, draggedId, ids.indexOf(targetId) - ids.indexOf(draggedId));
}
