'use client';

import { useState } from 'react';
import type { Dispatch, KeyboardEvent } from 'react';

import { IconButton } from '@/shared/blocks/icon-button';
import { strings } from '@/shared/i18n/strings';
import { Close, Trash } from '@/shared/ui/icons';
import { Input } from '@/shared/ui/input';

import { MAX_VALUES_PER_OPTION } from './draft';
import type { OptionDraft, ValueDraft } from './draft';
import type { DraftAction } from './draft-reducer';

const text = strings.productForm;
const MAX_LABEL_LENGTH = 30;
const COMMIT_KEYS = new Set(['Enter', ',']);

interface OptionEditorProps {
  readonly option: OptionDraft;
  readonly dispatch: Dispatch<DraftAction>;
}

function ValueChip({
  value,
  onRemove,
}: {
  readonly value: ValueDraft;
  readonly onRemove: () => void;
}) {
  return (
    <span className="bg-secondary text-fine inline-flex items-center gap-1 rounded-[8px] py-1 pr-1 pl-2.5 font-medium">
      {value.name}
      <button
        type="button"
        aria-label={`${text.removeValue} ${value.name}`}
        onClick={onRemove}
        className="text-muted-foreground hover:text-foreground grid size-5 place-items-center rounded-[6px]"
      >
        <Close className="size-3" strokeWidth={2} />
      </button>
    </span>
  );
}

export function OptionEditor({ option, dispatch }: OptionEditorProps) {
  const [pendingValue, setPendingValue] = useState('');
  const canAddValue = option.values.length < MAX_VALUES_PER_OPTION;

  function commitValue() {
    if (pendingValue.trim() === '') return;
    dispatch({
      type: 'add-value',
      optionKey: option.key,
      key: crypto.randomUUID(),
      name: pendingValue,
    });
    setPendingValue('');
  }

  function onValueKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!COMMIT_KEYS.has(event.key)) return;
    event.preventDefault();
    commitValue();
  }

  return (
    <div className="bg-background border-border flex flex-col gap-2.5 rounded-[10px] border p-3">
      <div className="flex items-center gap-2">
        <Input
          variant="form"
          value={option.name}
          maxLength={MAX_LABEL_LENGTH}
          placeholder={text.optionNamePlaceholder}
          aria-label={text.optionNamePlaceholder}
          className="h-9 flex-1"
          onChange={(event) => {
            dispatch({ type: 'rename-option', key: option.key, name: event.currentTarget.value });
          }}
        />
        <IconButton
          label={text.removeOption}
          icon={Trash}
          onClick={() => {
            dispatch({ type: 'remove-option', key: option.key });
          }}
        />
      </div>
      <div
        role="group"
        aria-label={`${text.optionValuesLabel} ${option.name}`}
        className="flex flex-wrap items-center gap-1.5"
      >
        {option.values.map((value) => (
          <ValueChip
            key={value.key}
            value={value}
            onRemove={() => {
              dispatch({ type: 'remove-value', optionKey: option.key, key: value.key });
            }}
          />
        ))}
        {canAddValue ? (
          <input
            value={pendingValue}
            maxLength={MAX_LABEL_LENGTH}
            placeholder={text.optionValuePlaceholder}
            aria-label={`${text.optionValuesLabel} ${option.name}`}
            onKeyDown={onValueKeyDown}
            onBlur={commitValue}
            onChange={(event) => {
              setPendingValue(event.currentTarget.value);
            }}
            className="text-fine h-7 min-w-[160px] flex-1 bg-transparent px-1 outline-none placeholder:text-(--txt-faint)"
          />
        ) : null}
      </div>
    </div>
  );
}
