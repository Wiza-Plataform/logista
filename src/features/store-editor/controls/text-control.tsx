import { Field, FieldState } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import { errorFor } from '../draft-validation';
import { useEditor } from '../editor-context';
import { GroupTitle } from './control-group';

const INPUT_SIZE = 'max-[899px]:h-11';

export function TextControl({
  label,
  field,
  value,
  maxLength,
  type = 'text',
  isGroupLabel = false,
  onChange,
}: {
  readonly label: string;
  readonly field: string;
  readonly value: string;
  readonly maxLength?: number;
  readonly type?: 'text' | 'tel';
  readonly isGroupLabel?: boolean;
  readonly onChange: (value: string) => void;
}) {
  const { errors } = useEditor();
  const error = errorFor(errors, field);

  const input = (
    <Input
      variant="form"
      type={type}
      value={value}
      maxLength={maxLength}
      aria-invalid={error !== undefined}
      className={INPUT_SIZE}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  );

  if (isGroupLabel) {
    return (
      <label className="flex flex-col gap-2.5">
        <GroupTitle>{label}</GroupTitle>
        {input}
        {error !== undefined && <FieldState tone="negative" text={error} />}
      </label>
    );
  }

  return (
    <Field label={label} error={error}>
      {input}
    </Field>
  );
}
