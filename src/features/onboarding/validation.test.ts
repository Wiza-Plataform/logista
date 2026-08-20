import assert from 'node:assert/strict';
import { test } from 'node:test';

import { toFormField, validateAccount, validateTax } from './validation.ts';

const VALID_ACCOUNT = {
  name: 'Loja Kianda',
  subdomain: 'lojakianda',
  categoryUlid: '01M036KBJD3J5ED7BP2R8Z5MW1',
  whatsappPhone: '923 000 111',
  email: 'yara@lojakianda.ao',
};

test('a filled account reports no failure', () => {
  assert.deepEqual(validateAccount(VALID_ACCOUNT), {});
});

test('phone counts digits, not characters — "923 000 111" has nine', () => {
  assert.equal(
    validateAccount({ ...VALID_ACCOUNT, whatsappPhone: '92300011' }).whatsappPhone,
    'phoneTooShort',
  );
  assert.equal(
    validateAccount({ ...VALID_ACCOUNT, whatsappPhone: '923-000-111' }).whatsappPhone,
    undefined,
  );
});

test('a subdomain shorter than three characters is refused before reaching the API', () => {
  assert.equal(
    validateAccount({ ...VALID_ACCOUNT, subdomain: 'ab' }).subdomain,
    'subdomainTooShort',
  );
});

test('an unpicked category fails — the select yields an empty ulid', () => {
  assert.equal(validateAccount({ ...VALID_ACCOUNT, categoryUlid: '' }).categoryUlid, 'required');
});

test('an email without a domain is refused', () => {
  assert.equal(
    validateAccount({ ...VALID_ACCOUNT, email: 'yara@lojakianda' }).email,
    'invalidEmail',
  );
});

test('the nif needs nine digits', () => {
  assert.deepEqual(validateTax({ nif: '5417080912' }), {});
  assert.equal(validateTax({ nif: '54170' }).nif, 'nifTooShort');
});

test('the api error field maps onto a form field of the same name', () => {
  assert.equal(toFormField('subdomain'), 'subdomain');
  assert.equal(toFormField('whatsappPhone'), 'whatsappPhone');
  assert.equal(toFormField('primaryColor'), 'primaryColor');
});

test('an unknown field is not mapped — it becomes a general alert, not a field error', () => {
  assert.equal(toFormField('fieldThatDoesNotExist'), undefined);
  assert.equal(toFormField(undefined), undefined);
});
