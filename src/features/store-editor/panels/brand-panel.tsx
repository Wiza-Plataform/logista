'use client';

import { maskLocalPhoneAO } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { Field, InputAffix } from '@/shared/ui/field';

import { ControlGroup } from '../controls/control-group';
import { TextControl } from '../controls/text-control';
import { patchIdentity } from '../draft-model';
import { errorFor } from '../draft-validation';
import { useEditor } from '../editor-context';
import { AddressFields } from './address-fields';
import { LogoField } from './logo-field';
import { PanelSubtitle, PanelTitle } from './panel-title';

const t = strings.storeEditor.brand;

const WHATSAPP_FIELD = 'identity.whatsapp';

function IdentityFields() {
  const { draft, edit } = useEditor();
  const { identity } = draft;

  return (
    <ControlGroup title={t.identity}>
      <TextControl
        label={t.storeName}
        field="identity.storeName"
        value={identity.storeName}
        maxLength={120}
        onChange={(storeName) => {
          edit(patchIdentity({ storeName }), 'storeName');
        }}
      />
      <TextControl
        label={t.tagline}
        field="identity.tagline"
        value={identity.tagline ?? ''}
        maxLength={160}
        onChange={(tagline) => {
          edit(patchIdentity({ tagline }), 'tagline');
        }}
      />
      <LogoField />
    </ControlGroup>
  );
}

function ContactFields() {
  const { draft, edit, errors } = useEditor();
  const { identity } = draft;
  const whatsappError = errorFor(errors, WHATSAPP_FIELD);

  return (
    <ControlGroup title={t.contacts}>
      <Field label={t.whatsapp} error={whatsappError}>
        <InputAffix
          type="tel"
          prefix={t.phonePrefix}
          value={maskLocalPhoneAO(identity.whatsapp ?? '')}
          isInvalid={whatsappError !== undefined}
          className="max-[899px]:h-11"
          onChange={(event) => {
            edit(patchIdentity({ whatsapp: maskLocalPhoneAO(event.target.value) }), 'whatsapp');
          }}
        />
      </Field>
      <TextControl
        label={t.instagram}
        field="identity.instagram"
        value={identity.instagram ?? ''}
        maxLength={31}
        onChange={(instagram) => {
          edit(patchIdentity({ instagram }), 'instagram');
        }}
      />
    </ControlGroup>
  );
}

export function BrandPanel() {
  return (
    <div className="flex flex-col px-4 pt-[18px] pb-7">
      <div className="flex flex-col gap-1 pb-1.5">
        <PanelTitle>{t.title}</PanelTitle>
        <PanelSubtitle>{t.subtitle}</PanelSubtitle>
      </div>
      <IdentityFields />
      <ContactFields />
      <AddressFields />
    </div>
  );
}
