import type { ColorScheme } from '@/shared/contracts/store-theme';
import { strings } from '@/shared/i18n/strings';

import type { SectionKey } from '../draft-model';
import { sectionOf, setColorScheme } from '../draft-model';
import { useEditor } from '../editor-context';
import { previewThemeOf } from '../preview/preview-theme';
import { ControlGroup } from './control-group';
import { OptionCard } from './option-card';

const t = strings.storeEditor.inspector;

const SCHEMES: readonly { readonly value: ColorScheme; readonly label: string }[] = [
  { value: 'base', label: t.schemeBase },
  { value: 'soft', label: t.schemeSoft },
  { value: 'accent', label: t.schemeAccent },
  { value: 'dark', label: t.schemeDark },
];

export function ColorSchemePicker({ section }: { readonly section: SectionKey }) {
  const { draft, edit } = useEditor();
  const theme = previewThemeOf(draft.style);
  const current = sectionOf(draft.sections, section);
  const selected = current !== null && 'colorScheme' in current ? current.colorScheme : null;

  return (
    <ControlGroup title={t.colorScheme} isLast>
      <div role="group" aria-label={t.colorScheme} className="grid grid-cols-4 gap-2">
        {SCHEMES.map((scheme) => {
          const colors = theme.schemeOf(scheme.value);
          return (
            <OptionCard
              key={scheme.value}
              isSelected={selected === scheme.value}
              onClick={() => {
                edit(setColorScheme(section, scheme.value));
              }}
              className="text-caption flex flex-col items-center gap-1.5 px-1 pt-1.5 pb-2 font-bold"
            >
              <span
                aria-hidden="true"
                className="flex h-[34px] w-full items-center justify-center rounded-[8px] text-[15px] font-extrabold"
                style={{
                  background: colors.background,
                  color: colors.foreground,
                  boxShadow: `inset 0 0 0 1px ${colors.line}`,
                  fontFamily: theme.displayFont,
                }}
              >
                {t.specimen}
              </span>
              <span>{scheme.label}</span>
            </OptionCard>
          );
        })}
      </div>
    </ControlGroup>
  );
}
