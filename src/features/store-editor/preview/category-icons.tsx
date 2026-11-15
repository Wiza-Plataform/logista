'use client';

import { useEditor } from '../editor-context';
import { Tiles } from '../editor-icons';
import type { CategoryOption } from './categories-preview';
import { ALL_CATEGORIES, usePreview } from './preview-context';

function iconRadius(isSquare: boolean, buttonIsRound: boolean): string {
  if (isSquare) return '0px';
  return buttonIsRound ? '50%' : '16px';
}

export function IconCategories({ options }: { readonly options: readonly CategoryOption[] }) {
  const { draft } = useEditor();
  const { theme, isMobile, activeCategory, setActiveCategory } = usePreview();
  const section = draft.sections.categories;
  const colors = theme.schemeOf(section.colorScheme);
  const isAccent = section.colorScheme === 'accent';
  const size = isMobile ? 56 : 64;
  const radius = iconRadius(theme.isSquareCorners, theme.cornerPx > 12);
  const activeBackground = isAccent ? theme.preset.onPrimary : theme.preset.primary;
  const idleBackground = isAccent ? 'rgba(255,255,255,.25)' : theme.tokens.soft;

  return (
    <div
      className="flex flex-wrap gap-[18px]"
      style={{ justifyContent: section.alignment === 'center' ? 'center' : 'flex-start' }}
    >
      {options.map(({ id, label }) => {
        const isActive = activeCategory === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={isActive}
            onClick={() => {
              setActiveCategory(id);
            }}
            className="flex flex-col items-center gap-2 border-0 bg-transparent p-0 text-[12.5px]"
            style={{
              color: isActive ? colors.foreground : colors.muted,
              fontWeight: isActive ? 800 : 600,
            }}
          >
            <span
              className="flex items-center justify-center text-[20px] font-extrabold"
              style={{
                width: size,
                height: size,
                borderRadius: radius,
                background: isActive ? activeBackground : idleBackground,
                color: isActive ? theme.preset.onPrimary : colors.foreground,
              }}
            >
              {id === ALL_CATEGORIES ? (
                <Tiles className="size-[22px]" />
              ) : (
                label.charAt(0).toUpperCase()
              )}
            </span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
