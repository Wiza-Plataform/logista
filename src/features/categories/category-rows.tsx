import { IconButton } from '@/shared/blocks/icon-button';
import type { CategoryNode } from '@/shared/contracts/catalog/category';
import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';
import { Eye, EyeCrossed, Folder, Grip, Pencil, SubArrow } from '@/shared/ui/icons';

import { categoryColorOf } from './category-color';
import { addressLine, productCountLabel } from './category-labels';
import type { DragBindings, GripKeyHandler } from './use-sibling-order';

const text = strings.categories;

export interface CategoryRowActions {
  readonly onEdit: (category: CategoryNode) => void;
  readonly onToggleVisibility: (category: CategoryNode) => void;
}

export interface CategoryRowProps {
  readonly category: CategoryNode;
  readonly isDragging: boolean;
  readonly dragBindings: DragBindings;
  readonly onGripKeyDown: GripKeyHandler;
  readonly actions: CategoryRowActions;
}

function GripHandle({
  name,
  onKeyDown,
  isSmall,
}: {
  readonly name: string;
  readonly onKeyDown: GripKeyHandler;
  readonly isSmall: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={`${text.reorder} ${name}`}
      title={text.reorderHint}
      onKeyDown={onKeyDown}
      className="focus-visible:ring-ring/50 grid w-[18px] shrink-0 cursor-grab place-items-center rounded-[4px] text-(--txt-faint) outline-none focus-visible:ring-3 active:cursor-grabbing"
    >
      <Grip className={isSmall ? 'size-[14px]' : 'size-4'} strokeWidth={1.8} />
    </button>
  );
}

function RowActions({
  category,
  actions,
  size,
}: {
  readonly category: CategoryNode;
  readonly actions: CategoryRowActions;
  readonly size: 'compact' | 'regular';
}) {
  return (
    <div className="flex shrink-0 gap-[5px]">
      <IconButton
        size={size}
        label={`${category.isVisible ? text.hide : text.show} ${category.name}`}
        icon={category.isVisible ? EyeCrossed : Eye}
        onClick={() => {
          actions.onToggleVisibility(category);
        }}
      />
      <IconButton
        size={size}
        label={`${text.edit} ${category.name}`}
        icon={Pencil}
        onClick={() => {
          actions.onEdit(category);
        }}
      />
    </div>
  );
}

function rowStateClasses(category: CategoryNode, isDragging: boolean): string {
  return cn(!category.isVisible && 'opacity-55', isDragging && 'border-dashed opacity-50');
}

export function CategoryRow({
  category,
  isDragging,
  dragBindings,
  onGripKeyDown,
  actions,
}: CategoryRowProps) {
  const color = categoryColorOf(category.categoryUlid);
  const productCount = productCountLabel(category);

  return (
    <div
      {...dragBindings}
      className={cn(
        'bg-card border-border flex items-center gap-3 rounded-(--radius) border px-3.5 py-[13px] transition-[border-color,box-shadow,opacity] duration-[140ms] hover:border-(--lima-oliva) max-[560px]:gap-2.5 max-[560px]:px-3',
        rowStateClasses(category, isDragging),
      )}
    >
      <GripHandle name={category.name} onKeyDown={onGripKeyDown} isSmall={false} />
      <span
        className={cn('grid size-[38px] shrink-0 place-items-center rounded-[10px]', color.badge)}
      >
        <Folder className="size-[19px]" strokeWidth={1.8} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-body truncate font-semibold">{category.name}</div>
        <div className="text-caption mt-0.5 truncate text-(--txt-faint)">
          {addressLine(category)}
        </div>
        <div className="text-caption text-muted-foreground mt-0.5 hidden max-[560px]:block">
          {productCount}
        </div>
      </div>
      <span className="text-fine text-muted-foreground whitespace-nowrap tabular-nums max-[560px]:hidden">
        {productCount}
      </span>
      <RowActions category={category} actions={actions} size="regular" />
    </div>
  );
}

export function SubcategoryRow({
  category,
  isDragging,
  dragBindings,
  onGripKeyDown,
  actions,
}: CategoryRowProps) {
  return (
    <div
      {...dragBindings}
      className={cn(
        'bg-muted flex items-center gap-[9px] rounded-[10px] border border-(--border-soft) px-3 py-2 transition-[border-color,opacity] duration-[140ms] hover:border-(--lima-oliva)',
        rowStateClasses(category, isDragging),
      )}
    >
      <GripHandle name={category.name} onKeyDown={onGripKeyDown} isSmall />
      <SubArrow className="size-[13px] shrink-0 text-(--txt-faint)" strokeWidth={1.9} />
      <span className="text-fine min-w-0 flex-1 truncate font-medium">{category.name}</span>
      <span className="text-label whitespace-nowrap text-(--txt-faint) tabular-nums">
        {productCountLabel(category)}
      </span>
      <RowActions category={category} actions={actions} size="compact" />
    </div>
  );
}
