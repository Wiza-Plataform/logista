import { apiRequest, parseResponse } from '@/shared/api/client';
import { stockMovementPageSchema, stockProductPageSchema } from '@/shared/contracts/catalog/stock';
import type {
  RegisterMovementRequest,
  StockCounts,
  StockMovement,
  StockProductPage,
} from '@/shared/contracts/catalog/stock';

const HISTORY_SIZE = '20';
const COUNT_ONLY = '1';

function stockPath(storeUlid: string): string {
  return `/stores/${storeUlid}/stock`;
}

function stockProductsPath(storeUlid: string): string {
  return `${stockPath(storeUlid)}/products`;
}

async function totalWith(storeUlid: string, status: 'LOW' | 'OUT' | null): Promise<number> {
  const query = status === null ? { pageSize: COUNT_ONLY } : { status, pageSize: COUNT_ONLY };
  const page = parseResponse(
    stockProductPageSchema,
    await apiRequest(stockProductsPath(storeUlid), { query }),
  );
  return page.total;
}

export async function fetchStockPage(
  storeUlid: string,
  query: Readonly<Record<string, string>>,
): Promise<StockProductPage> {
  return parseResponse(
    stockProductPageSchema,
    await apiRequest(stockProductsPath(storeUlid), { query }),
  );
}

export async function fetchStockCounts(storeUlid: string): Promise<StockCounts> {
  const [all, low, out] = await Promise.all([
    totalWith(storeUlid, null),
    totalWith(storeUlid, 'LOW'),
    totalWith(storeUlid, 'OUT'),
  ]);
  return { all, low, out };
}

export async function fetchVariantMovements(
  storeUlid: string,
  variantUlid: string,
): Promise<readonly StockMovement[]> {
  const page = parseResponse(
    stockMovementPageSchema,
    await apiRequest(`${stockPath(storeUlid)}/movements`, {
      query: { variant: variantUlid, pageSize: HISTORY_SIZE },
    }),
  );
  return page.items;
}

export async function registerMovement(
  storeUlid: string,
  request: RegisterMovementRequest,
): Promise<void> {
  await apiRequest(`${stockPath(storeUlid)}/movements`, { method: 'POST', body: request });
}
