'use client';

import type { ThemeStyle } from '@/shared/contracts/store-theme';
import { strings } from '@/shared/i18n/strings';
import { PALETTE_OPTIONS } from '@/shared/store-theme/palette-options';

import { ControlGroup } from '../controls/control-group';
import { OptionCard } from '../controls/option-card';
import { SegmentControl } from '../controls/segment-control';
import { patchStyle } from '../draft-model';
import { useEditor } from '../editor-context';
import { Tick } from '../editor-icons';
import { FONT_STACKS, LIGHT_INK } from '../preview/preview-theme';

const t = strings.storeEditor.style;

const DOT = 'size-5 rounded-full';
const DOT_RING = '0 0 0 2px var(--surface)';

export function PaletteChoices() {
  const { draft, edit } = useEditor();

  return (
    <ControlGroup title={t.palette}>
      <div className="grid grid-cols-2 gap-2">
        {PALETTE_OPTIONS.map(({ palette, label, preset }) => (
          <OptionCard
            key={palette}
            isSelected={draft.style.palette === palette}
            onClick={() => {
              edit(patchStyle({ palette }));
            }}
            className="text-note flex items-center gap-2.5 p-2.5 font-bold max-[899px]:min-h-11"
          >
            <span aria-hidden="true" className="flex shrink-0">
              <span className={DOT} style={{ background: preset.primary, boxShadow: DOT_RING }} />
              <span
                className={`${DOT} -ml-1.5`}
                style={{ background: preset.soft, boxShadow: DOT_RING }}
              />
              <span
                className={`${DOT} -ml-1.5`}
                style={{ background: LIGHT_INK, boxShadow: DOT_RING }}
              />
            </span>
            <span>{label}</span>
          </OptionCard>
        ))}
      </div>
      <div className="text-fine flex items-center gap-2 rounded-[10px] bg-(--active-bg) px-2.5 py-2 font-semibold text-(--active-fg)">
        <Tick className="size-[15px]" strokeWidth={2.2} />
        <span>{t.contrast}</span>
      </div>
    </ControlGroup>
  );
}

const FONT_CHOICES: readonly {
  readonly value: ThemeStyle['fontPairing'];
  readonly label: string;
  readonly fonts: string;
  readonly family: string;
}[] = [
  { value: 'modern', label: t.modern, fonts: t.modernFonts, family: FONT_STACKS.bricolage },
  { value: 'classic', label: t.classic, fonts: t.classicFonts, family: FONT_STACKS.fraunces },
  { value: 'minimal', label: t.minimal, fonts: t.minimalFonts, family: FONT_STACKS.spaceGrotesk },
];

export function FontChoices() {
  const { draft, edit } = useEditor();

  return (
    <ControlGroup title={t.typography}>
      {FONT_CHOICES.map(({ value, label, fonts, family }) => (
        <OptionCard
          key={value}
          isSelected={draft.style.fontPairing === value}
          onClick={() => {
            edit(patchStyle({ fontPairing: value }));
          }}
          className="flex items-center gap-3.5 px-3 py-2.5"
        >
          <span
            aria-hidden="true"
            className="w-[46px] shrink-0 text-[28px] leading-none font-extrabold"
            style={{ fontFamily: family }}
          >
            {t.specimen}
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="text-note font-extrabold">{label}</span>
            <span className="text-caption text-(--txt-dim)">{fonts}</span>
          </span>
        </OptionCard>
      ))}
    </ControlGroup>
  );
}

const SHAPES: readonly {
  readonly value: ThemeStyle['buttonShape'];
  readonly label: string;
  readonly radius: string;
}[] = [
  { value: 'pill', label: t.pill, radius: '999px' },
  { value: 'rounded', label: t.rounded, radius: '6px' },
  { value: 'square', label: t.straight, radius: '0' },
];

export function ButtonChoices() {
  const { draft, edit } = useEditor();

  return (
    <ControlGroup title={t.buttons}>
      <div className="grid grid-cols-3 gap-2">
        {SHAPES.map(({ value, label, radius }) => (
          <OptionCard
            key={value}
            isSelected={draft.style.buttonShape === value}
            onClick={() => {
              edit(patchStyle({ buttonShape: value }));
            }}
            className="text-fine flex flex-col items-center gap-2 px-1.5 pt-3 pb-2.5 font-bold"
          >
            <span
              aria-hidden="true"
              className="bg-foreground h-[22px] w-16 max-w-full"
              style={{ borderRadius: radius }}
            />
            <span>{label}</span>
          </OptionCard>
        ))}
      </div>
      <SegmentControl
        label={t.buttons}
        value={draft.style.buttonFill}
        options={[
          { value: 'solid', label: t.solid },
          { value: 'outline', label: t.outline },
        ]}
        onChange={(buttonFill) => {
          edit(patchStyle({ buttonFill }));
        }}
      />
    </ControlGroup>
  );
}
