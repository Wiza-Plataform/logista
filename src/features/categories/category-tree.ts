import type { CategoryNode } from '@/shared/contracts/catalog/category';

export const MAX_CATEGORY_DEPTH = 3;

export type TreeChange =
  | {
      readonly kind: 'reorder';
      readonly parentCategoryUlid: string | null;
      readonly categoryUlids: readonly string[];
    }
  | { readonly kind: 'visibility'; readonly categoryUlid: string; readonly isVisible: boolean };

export interface ParentChoice {
  readonly categoryUlid: string;
  readonly path: readonly string[];
}

interface PlacedCategory {
  readonly node: CategoryNode;
  readonly depth: number;
  readonly path: readonly string[];
}

function inOrder(
  siblings: readonly CategoryNode[],
  categoryUlids: readonly string[],
): readonly CategoryNode[] {
  return categoryUlids
    .map((ulid) => siblings.find((sibling) => sibling.categoryUlid === ulid))
    .filter((sibling): sibling is CategoryNode => sibling !== undefined);
}

function mapTree(
  tree: readonly CategoryNode[],
  transform: (node: CategoryNode) => CategoryNode,
): readonly CategoryNode[] {
  return tree.map((node) =>
    transform({ ...node, subcategories: mapTree(node.subcategories, transform) }),
  );
}

export function applyChange(
  tree: readonly CategoryNode[],
  change: TreeChange,
): readonly CategoryNode[] {
  if (change.kind === 'visibility') {
    return mapTree(tree, (node) =>
      node.categoryUlid === change.categoryUlid ? { ...node, isVisible: change.isVisible } : node,
    );
  }
  if (change.parentCategoryUlid === null) return inOrder(tree, change.categoryUlids);
  return mapTree(tree, (node) =>
    node.categoryUlid === change.parentCategoryUlid
      ? { ...node, subcategories: inOrder(node.subcategories, change.categoryUlids) }
      : node,
  );
}

export function productCountOf(node: CategoryNode): number {
  return node.subcategories.reduce(
    (total, subcategory) => total + productCountOf(subcategory),
    node.productCount,
  );
}

function placeAll(
  tree: readonly CategoryNode[],
  depth = 1,
  parentPath: readonly string[] = [],
): readonly PlacedCategory[] {
  return tree.flatMap((node) => {
    const path = [...parentPath, node.name];
    return [{ node, depth, path }, ...placeAll(node.subcategories, depth + 1, path)];
  });
}

export function subcategoryCountOf(tree: readonly CategoryNode[]): number {
  return placeAll(tree).filter((placed) => placed.depth > 1).length;
}

export function visibleTopLevelCountOf(tree: readonly CategoryNode[]): number {
  return tree.filter((node) => node.isVisible).length;
}

function heightOf(node: CategoryNode): number {
  return 1 + Math.max(0, ...node.subcategories.map(heightOf));
}

function ulidsWithin(node: CategoryNode): ReadonlySet<string> {
  return new Set(placeAll([node]).map((placed) => placed.node.categoryUlid));
}

export function parentChoicesFor(
  tree: readonly CategoryNode[],
  editing: CategoryNode | null,
): readonly ParentChoice[] {
  const excluded = editing === null ? new Set<string>() : ulidsWithin(editing);
  const height = editing === null ? 1 : heightOf(editing);

  return placeAll(tree)
    .filter(({ node, depth }) => {
      return !excluded.has(node.categoryUlid) && depth + height <= MAX_CATEGORY_DEPTH;
    })
    .map(({ node, path }) => ({ categoryUlid: node.categoryUlid, path }));
}

export function movedBy(
  categoryUlids: readonly string[],
  categoryUlid: string,
  offset: number,
): readonly string[] | null {
  const from = categoryUlids.indexOf(categoryUlid);
  const to = from + offset;
  if (from === -1 || to < 0 || to >= categoryUlids.length) return null;

  const reordered = categoryUlids.filter((ulid) => ulid !== categoryUlid);
  reordered.splice(to, 0, categoryUlid);
  return reordered;
}

export function droppedOn(
  categoryUlids: readonly string[],
  draggedUlid: string,
  targetUlid: string,
): readonly string[] | null {
  if (draggedUlid === targetUlid) return null;
  return movedBy(
    categoryUlids,
    draggedUlid,
    categoryUlids.indexOf(targetUlid) - categoryUlids.indexOf(draggedUlid),
  );
}
