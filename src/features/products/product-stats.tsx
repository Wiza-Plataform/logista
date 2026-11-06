import { StatCard, StatGrid } from '@/shared/blocks/stat-card';
import type { ProductOverview } from '@/shared/contracts/catalog/product';
import { formatCompactKwanzaAmount, formatCount, KWANZA_SYMBOL } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { Box, Check, Currency, Warning } from '@/shared/ui/icons';

const stats = strings.products.stats;

export function ProductStats({ overview }: { readonly overview: ProductOverview }) {
  return (
    <StatGrid>
      <StatCard
        label={stats.total}
        icon={Box}
        value={formatCount(overview.total)}
        meta={stats.totalMeta}
      />
      <StatCard
        label={stats.published}
        icon={Check}
        value={formatCount(overview.published)}
        meta={stats.publishedMeta}
      />
      <StatCard
        label={stats.lowStock}
        icon={Warning}
        value={formatCount(overview.lowStock)}
        meta={stats.lowStockMeta}
      />
      <StatCard
        label={stats.stockValue}
        icon={Currency}
        value={formatCompactKwanzaAmount(overview.stockValueInCents)}
        unit={KWANZA_SYMBOL}
        meta={stats.stockValueMeta}
        isHighlighted
      />
    </StatGrid>
  );
}
