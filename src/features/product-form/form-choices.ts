import type { Unit } from '@/shared/contracts/catalog/unit';

export interface CategoryChoice {
  readonly categoryUlid: string;
  readonly path: readonly string[];
}

export interface FormChoices {
  readonly units: readonly Unit[];
  readonly categories: readonly CategoryChoice[];
  readonly storeAddress: string;
}
