'use client';

import { SelectField } from '@/shared/forms/select-field';
import { strings } from '@/shared/i18n/strings';
import { Field } from '@/shared/ui/field';

import { ControlGroup, ControlHint } from '../controls/control-group';
import { TextControl } from '../controls/text-control';
import { EMPTY_ADDRESS, patchAddress } from '../draft-model';
import { errorFor } from '../draft-validation';
import { useEditor } from '../editor-context';

const t = strings.storeEditor.brand;

const PROVINCE_FIELD = 'identity.address.provinceUlid';

function ProvinceField({ value }: { readonly value: string }) {
  const { data, edit, errors } = useEditor();
  const error = errorFor(errors, PROVINCE_FIELD);
  const options = [
    { value: '', label: t.provincePlaceholder },
    ...data.provinces.map((province) => ({ value: province.ulid, label: province.label })),
  ];

  return (
    <Field label={t.province} isGroup error={error}>
      <SelectField
        options={options}
        value={value}
        isInvalid={error !== undefined}
        className="max-[899px]:h-11"
        onValueChange={(provinceUlid) => {
          edit(patchAddress({ provinceUlid }));
        }}
      />
    </Field>
  );
}

export function AddressFields() {
  const { draft, edit } = useEditor();
  const address = draft.identity.address ?? EMPTY_ADDRESS;

  return (
    <ControlGroup title={t.address} isLast>
      <TextControl
        label={t.street}
        field="identity.address.street"
        value={address.street}
        maxLength={120}
        onChange={(street) => {
          edit(patchAddress({ street }), 'street');
        }}
      />
      <TextControl
        label={t.neighborhood}
        field="identity.address.neighborhood"
        value={address.neighborhood}
        maxLength={80}
        onChange={(neighborhood) => {
          edit(patchAddress({ neighborhood }), 'neighborhood');
        }}
      />
      <TextControl
        label={t.municipality}
        field="identity.address.municipality"
        value={address.municipality}
        maxLength={80}
        onChange={(municipality) => {
          edit(patchAddress({ municipality }), 'municipality');
        }}
      />
      <ProvinceField value={address.provinceUlid} />
      <TextControl
        label={t.referencePoint}
        field="identity.address.referencePoint"
        value={address.referencePoint}
        maxLength={160}
        onChange={(referencePoint) => {
          edit(patchAddress({ referencePoint }), 'referencePoint');
        }}
      />
      <ControlHint>{t.addressHint}</ControlHint>
    </ControlGroup>
  );
}
