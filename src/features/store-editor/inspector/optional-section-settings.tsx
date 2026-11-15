'use client';

import { strings } from '@/shared/i18n/strings';

import { ColorSchemePicker } from '../controls/color-scheme-picker';
import { ControlGroup, LinkButton } from '../controls/control-group';
import { removeOptionalSection } from '../draft-model';
import type { OptionalSection } from '../draft-model';
import { useEditor } from '../editor-context';
import { TrashCan } from '../editor-icons';
import { instagramLabel } from '../identity-labels';

const t = strings.storeEditor.inspector;
const previewText = strings.storeEditor.preview;

function RemoveSection({ section }: { readonly section: OptionalSection }) {
  const { edit, select } = useEditor();

  return (
    <div className="py-4">
      <button
        type="button"
        onClick={() => {
          edit(removeOptionalSection(section));
          select('products');
        }}
        className="text-note flex min-h-10 w-full items-center justify-center gap-2 rounded-[10px] bg-(--st-cancel-bg) font-bold text-(--st-cancel-fg) focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none max-[899px]:min-h-11"
      >
        <TrashCan className="size-[15px]" />
        <span>{t.remove}</span>
      </button>
    </div>
  );
}

export function FaqSettings() {
  const questions = [
    previewText.faqFirstQuestion,
    previewText.faqSecondQuestion,
    previewText.faqThirdQuestion,
  ];

  return (
    <>
      <ControlGroup title={t.questions}>
        {questions.map((question) => (
          <span
            key={question}
            className="text-note bg-muted rounded-[10px] px-3 py-2.5 font-semibold"
          >
            {question}
          </span>
        ))}
      </ControlGroup>
      <div className="border-b border-(--border-soft)">
        <ColorSchemePicker section="faq" />
      </div>
      <RemoveSection section="faq" />
    </>
  );
}

export function InstagramSettings() {
  const { draft, setTab } = useEditor();

  return (
    <>
      <ControlGroup title={t.account}>
        <span className="text-body font-semibold">
          {instagramLabel(draft.identity.instagram) ?? t.noAccount}
        </span>
        <LinkButton
          label={t.changeInBrand}
          onClick={() => {
            setTab('brand');
          }}
        />
      </ControlGroup>
      <div className="border-b border-(--border-soft)">
        <ColorSchemePicker section="instagram" />
      </div>
      <RemoveSection section="instagram" />
    </>
  );
}
