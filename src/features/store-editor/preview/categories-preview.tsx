'use client';

import { strings } from '@/shared/i18n/strings';

import { useEditor } from '../editor-context';
import { IconCategories } from './category-icons';
import { ALL_CATEGORIES, usePreview } from './preview-context';
import { SectionFrame } from './section-frame';

const t = strings.storeEditor;

export interface CategoryOption {
  readonly id: string;
  readonly label: string;
}

function useCategoryOptions(): readonly CategoryOption[] {
  const { data } = useEditor();
  return [
    { id: ALL_CATEGORIES, label: t.preview.allCategories },
    ...data.categories.map((category) => ({ id: category.categoryUlid, label: category.name })),
  ];
}

function PillCategories({ options }: { readonly options: readonly CategoryOption[] }) {
  const { draft } = useEditor();
  const { theme, activeCategory, setActiveCategory } = usePreview();
  const section = draft.sections.categories;
  const colors = theme.schemeOf(section.colorScheme);
  const isTabs = section.style === 'tabs';
  const isAccent = section.colorScheme === 'accent';
  const activeBackground = isAccent ? theme.preset.onPrimary : theme.preset.primary;
  const activeForeground = isAccent ? theme.preset.primary : theme.preset.onPrimary;

  function pillStyle(isActive: boolean) {
    if (isTabs) {
      return {
        height: 40,
        padding: '0 2px',
        background: 'transparent',
        color: isActive ? colors.foreground : colors.muted,
        boxShadow: isActive ? `inset 0 -2px 0 ${colors.foreground}` : 'none',
      };
    }
    return {
      height: 36,
      padding: '0 16px',
      borderRadius: theme.buttonRadius,
      background: isActive ? activeBackground : 'transparent',
      color: isActive ? activeForeground : colors.foreground,
      boxShadow: isActive ? 'none' : `inset 0 0 0 1px ${colors.line}`,
    };
  }

  return (
    <div
      className="flex flex-wrap"
      style={{
        gap: isTabs ? 22 : 8,
        justifyContent: section.alignment === 'center' ? 'center' : 'flex-start',
        boxShadow: isTabs ? `inset 0 -1px 0 ${colors.line}` : 'none',
      }}
    >
      {options.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          aria-pressed={activeCategory === id}
          onClick={() => {
            setActiveCategory(id);
          }}
          className="text-note border-0"
          style={{
            ...pillStyle(activeCategory === id),
            fontWeight: activeCategory === id ? 800 : 600,
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function CategoriesPreview() {
  const { draft } = useEditor();
  const { theme, isMobile } = usePreview();
  const section = draft.sections.categories;
  const colors = theme.schemeOf(section.colorScheme);
  const options = useCategoryOptions();

  return (
    <SectionFrame
      section="categories"
      tag={t.sectionNames.categories}
      style={{
        padding: isMobile ? '18px 16px 8px' : '24px 24px 10px',
        background: colors.background,
        color: colors.foreground,
      }}
    >
      {section.style === 'icons' ? (
        <IconCategories options={options} />
      ) : (
        <PillCategories options={options} />
      )}
    </SectionFrame>
  );
}
