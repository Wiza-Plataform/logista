import { StatCard, StatGrid } from '@/shared/blocks/stat-card';
import type { CategoryNode } from '@/shared/contracts/catalog/category';
import type { ProductOverview } from '@/shared/contracts/catalog/product';
import { formatCount } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';
import { Bulb } from '@/shared/ui/icons';

import { categoryColorOf } from './category-color';
import type { CategoryColor } from './category-color';
import { productCountOf, subcategoryCountOf, visibleTopLevelCountOf } from './category-tree';

const text = strings.categories;
const PERCENT = 100;

interface Slice {
  readonly categoryUlid: string;
  readonly name: string;
  readonly count: number;
  readonly color: CategoryColor;
}

function slicesOf(tree: readonly CategoryNode[]): readonly Slice[] {
  return tree
    .map((node) => ({
      categoryUlid: node.categoryUlid,
      name: node.name,
      count: productCountOf(node),
      color: categoryColorOf(node.categoryUlid),
    }))
    .filter((slice) => slice.count > 0)
    .sort((left, right) => right.count - left.count);
}

function shareOf(count: number, total: number): string {
  return `${formatCount(count)} (${String(Math.round((count / total) * PERCENT))}%)`;
}

export function CategoryStats({
  tree,
  overview,
}: {
  readonly tree: readonly CategoryNode[];
  readonly overview: ProductOverview;
}) {
  return (
    <StatGrid>
      <StatCard label={text.stats.active} value={formatCount(visibleTopLevelCountOf(tree))} />
      <StatCard label={text.stats.subcategories} value={formatCount(subcategoryCountOf(tree))} />
      <StatCard label={text.stats.products} value={formatCount(overview.total)} />
      <StatCard
        label={text.stats.uncategorized}
        value={formatCount(overview.uncategorized)}
        isHighlighted
      />
    </StatGrid>
  );
}

function DistributionChart({ slices }: { readonly slices: readonly Slice[] }) {
  const total = slices.reduce((sum, slice) => sum + slice.count, 0);

  return (
    <>
      <div
        aria-hidden="true"
        className="mt-1 mb-3.5 flex h-[9px] gap-0.5 overflow-hidden rounded-[5px]"
      >
        {slices.map((slice) => (
          <div
            key={slice.categoryUlid}
            className={cn('basis-0', slice.color.swatch)}
            style={{ flexGrow: slice.count }}
          />
        ))}
      </div>
      <ul className="flex flex-col gap-[9px] text-sm">
        {slices.map((slice) => (
          <li key={slice.categoryUlid} className="flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2">
              <span
                aria-hidden="true"
                className={cn('size-[9px] shrink-0 rounded-[3px]', slice.color.swatch)}
              />
              <span className="truncate">{slice.name}</span>
            </span>
            <span className="text-muted-foreground whitespace-nowrap tabular-nums">
              {shareOf(slice.count, total)}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export function CategoryDistribution({ tree }: { readonly tree: readonly CategoryNode[] }) {
  const slices = slicesOf(tree);

  return (
    <section
      aria-labelledby="category-distribution"
      className="bg-card border-border rounded-(--radius) border p-4"
    >
      <h2 id="category-distribution" className="text-step mb-1 font-semibold">
        {text.distribution}
      </h2>
      {slices.length === 0 ? (
        <p className="text-fine text-muted-foreground mt-2">{text.distributionEmpty}</p>
      ) : (
        <DistributionChart slices={slices} />
      )}
    </section>
  );
}

export function OrganizationTip() {
  return (
    <aside className="flex gap-[11px] rounded-(--radius) border border-(--hl-border) bg-[image:var(--hl-grad)] p-3.5">
      <Bulb className="mt-px size-[19px] shrink-0 text-(--lima-oliva)" strokeWidth={1.8} />
      <div>
        <p className="mb-1 text-sm font-semibold">{text.tipTitle}</p>
        <p className="text-fine text-muted-foreground leading-[1.55]">
          <b className="font-semibold text-(--accent-text)">{text.tipLead}</b>
          {text.tipRest}
        </p>
      </div>
    </aside>
  );
}
