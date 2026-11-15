import type {
  ColorScheme,
  PageSection,
  ThemeAddress,
  ThemeDraft,
  ThemeSections,
} from '@/shared/contracts/store-theme';
import { movedBy } from '@/shared/forms/drag-order';

export type SectionKey = keyof ThemeSections;

export type OptionalSection = 'faq' | 'instagram';

export type DraftChange = (draft: ThemeDraft) => ThemeDraft;

export const TOP_SECTIONS: readonly SectionKey[] = ['announcement', 'header'];
export const BOTTOM_SECTIONS: readonly SectionKey[] = ['footer', 'whatsappButton'];

const PAGE_SECTIONS: readonly string[] = [
  'banner',
  'categories',
  'products',
  'about',
  'faq',
  'instagram',
];

const OPTIONAL_DEFAULT = { hidden: false, colorScheme: 'base' } as const;

export const EMPTY_ADDRESS: ThemeAddress = {
  street: '',
  neighborhood: '',
  municipality: '',
  provinceUlid: '',
  referencePoint: '',
};

export function isPageSection(key: SectionKey): key is PageSection {
  return PAGE_SECTIONS.includes(key);
}

type PatchOf<K extends SectionKey> = Partial<NonNullable<ThemeSections[K]>>;

function sectionEntries(sections: ThemeSections) {
  return Object.entries(sections) as [SectionKey, ThemeSections[SectionKey]][];
}

export function sectionOf(sections: ThemeSections, key: SectionKey): ThemeSections[SectionKey] {
  return sectionEntries(sections).find(([candidate]) => candidate === key)?.[1] ?? null;
}

function replaceSection(
  sections: ThemeSections,
  key: SectionKey,
  value: ThemeSections[SectionKey],
): ThemeSections {
  return Object.fromEntries(
    sectionEntries(sections).map(([candidate, current]) => [
      candidate,
      candidate === key ? value : current,
    ]),
  ) as ThemeSections;
}

export function patchSection<K extends SectionKey>(key: K, patch: PatchOf<K>): DraftChange {
  return (draft) => {
    const current = sectionOf(draft.sections, key);
    if (current === null) return draft;
    const next = { ...current, ...patch } as ThemeSections[SectionKey];
    return { ...draft, sections: replaceSection(draft.sections, key, next) };
  };
}

export function setColorScheme(key: SectionKey, colorScheme: ColorScheme): DraftChange {
  return patchSection(key, { colorScheme });
}

export function toggleHidden(key: SectionKey): DraftChange {
  return (draft) => {
    const current = sectionOf(draft.sections, key);
    if (current === null) return draft;
    const next = { ...current, hidden: !current.hidden } as ThemeSections[SectionKey];
    return { ...draft, sections: replaceSection(draft.sections, key, next) };
  };
}

export function addOptionalSection(key: OptionalSection): DraftChange {
  return (draft) => {
    if (sectionOf(draft.sections, key) !== null) return draft;
    return {
      ...draft,
      sections: replaceSection(draft.sections, key, OPTIONAL_DEFAULT),
      pageOrder: [...draft.pageOrder, key],
    };
  };
}

export function removeOptionalSection(key: OptionalSection): DraftChange {
  return (draft) => ({
    ...draft,
    sections: replaceSection(draft.sections, key, null),
    pageOrder: draft.pageOrder.filter((type) => type !== key),
  });
}

export function reorderPage(order: readonly string[]): DraftChange {
  return (draft) => ({ ...draft, pageOrder: order as PageSection[] });
}

export function moveSection(key: PageSection, offset: number): DraftChange {
  return (draft) => {
    const moved = movedBy(draft.pageOrder, key, offset);
    return moved === null ? draft : reorderPage(moved)(draft);
  };
}

export function patchStyle(patch: Partial<ThemeDraft['style']>): DraftChange {
  return (draft) => ({ ...draft, style: { ...draft.style, ...patch } });
}

export function patchIdentity(patch: Partial<ThemeDraft['identity']>): DraftChange {
  return (draft) => ({ ...draft, identity: { ...draft.identity, ...patch } });
}

export function patchAddress(patch: Partial<ThemeAddress>): DraftChange {
  return (draft) => ({
    ...draft,
    identity: {
      ...draft.identity,
      address: { ...(draft.identity.address ?? EMPTY_ADDRESS), ...patch },
    },
  });
}

function blankToNull(value: string | null): string | null {
  return value === null || value.trim() === '' ? null : value;
}

function isBlankAddress(address: ThemeAddress): boolean {
  return Object.values(address).every((value) => value.trim() === '');
}

export function payloadOf(draft: ThemeDraft): ThemeDraft {
  const { identity } = draft;
  return {
    ...draft,
    identity: {
      ...identity,
      tagline: blankToNull(identity.tagline),
      whatsapp: blankToNull(identity.whatsapp),
      instagram: blankToNull(identity.instagram),
      address:
        identity.address === null || isBlankAddress(identity.address) ? null : identity.address,
    },
  };
}
