import assert from 'node:assert/strict';
import { test } from 'node:test';

import { maskLocalPhoneAO } from '../../shared/i18n/format.ts';
import { toFormField, validateAccount } from './validation.ts';

const VALID_ACCOUNT = {
  name: 'Loja Kianda',
  fullName: 'Yara Domingas Kiala',
  phone: '923 000 111',
  email: 'yara@lojakianda.ao',
  password: 'kianda-2026',
};

test('a filled account reports no failure', () => {
  assert.deepEqual(validateAccount(VALID_ACCOUNT, true), {});
});

test('without an account only the trade name is checked', () => {
  const empty = { name: 'Loja Kianda', fullName: '', phone: '', email: '', password: '' };

  assert.deepEqual(validateAccount(empty, false), {});
  assert.equal(validateAccount({ ...empty, name: '  ' }, false).name, 'required');
});

test('the full name is required, as the api contract asks', () => {
  assert.equal(validateAccount({ ...VALID_ACCOUNT, fullName: '' }, true).fullName, 'required');
  assert.equal(validateAccount({ ...VALID_ACCOUNT, fullName: '  ' }, true).fullName, 'required');
});

test('phone counts digits, not characters — "923 000 111" has nine', () => {
  assert.equal(
    validateAccount({ ...VALID_ACCOUNT, phone: '92300011' }, true).phone,
    'phoneTooShort',
  );
  assert.equal(validateAccount({ ...VALID_ACCOUNT, phone: '923-000-111' }, true).phone, undefined);
});

test('the phone mask groups in threes and never passes nine digits', () => {
  assert.equal(maskLocalPhoneAO('923000111999'), '923 000 111');
  assert.equal(maskLocalPhoneAO('9230'), '923 0');
  assert.equal(maskLocalPhoneAO('abc'), '');
  assert.equal(maskLocalPhoneAO('+244923000111'), '923 000 111');
});

test('an email without a domain is refused', () => {
  assert.equal(
    validateAccount({ ...VALID_ACCOUNT, email: 'yara@lojakianda' }, true).email,
    'invalidEmail',
  );
});

test('the password needs ten characters, as the api does', () => {
  assert.equal(
    validateAccount({ ...VALID_ACCOUNT, password: '' }, true).password,
    'passwordTooShort',
  );
  assert.equal(
    validateAccount({ ...VALID_ACCOUNT, password: 'kianda202' }, true).password,
    'passwordTooShort',
  );
  assert.equal(
    validateAccount({ ...VALID_ACCOUNT, password: 'kianda2026' }, true).password,
    undefined,
  );
});

test('an empty trade name fails on the name field, the address is left to the api', () => {
  assert.equal(validateAccount({ ...VALID_ACCOUNT, name: '' }, true).name, 'required');
  assert.equal(validateAccount({ ...VALID_ACCOUNT, name: 'Zé' }, true).name, undefined);
});

test('api fields land on the form field of the same name', () => {
  assert.equal(toFormField('name'), 'name');
  assert.equal(toFormField('phone'), 'phone');
  assert.equal(toFormField('fullName'), 'fullName');
  assert.equal(toFormField('primaryColor'), 'primaryColor');
});

test('an unknown field is not mapped — it becomes a general alert, not a field error', () => {
  assert.equal(toFormField('fieldThatDoesNotExist'), undefined);
  assert.equal(toFormField(undefined), undefined);
});
