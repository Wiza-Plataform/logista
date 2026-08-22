import assert from 'node:assert/strict';
import { test } from 'node:test';

import { maskDigits, maskLocalPhoneAO } from '../../shared/i18n/format.ts';
import { deriveSubdomain } from './subdomain.ts';
import { isNifComplete, toFormField, validateAccount, validateTax } from './validation.ts';

const VALID_ACCOUNT = {
  name: 'Loja Kianda',
  whatsappPhone: '923 000 111',
  email: 'yara@lojakianda.ao',
  password: 'kianda2026',
};

const VALID_TAX = {
  nif: '5417080912',
  fiscalName: 'Yara Domingas Kiala',
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

test('the phone mask groups in threes and never passes nine digits', () => {
  assert.equal(maskLocalPhoneAO('923000111999'), '923 000 111');
  assert.equal(maskLocalPhoneAO('9230'), '923 0');
  assert.equal(maskLocalPhoneAO('abc'), '');
  assert.equal(maskLocalPhoneAO('+244923000111'), '923 000 111');
});

test('the nif mask keeps digits only, up to ten', () => {
  assert.equal(maskDigits('5417080912345', 10), '5417080912');
  assert.equal(maskDigits('541-708-091', 10), '541708091');
});

test('an email without a domain is refused', () => {
  assert.equal(
    validateAccount({ ...VALID_ACCOUNT, email: 'yara@lojakianda' }).email,
    'invalidEmail',
  );
});

test('the password needs eight characters', () => {
  assert.equal(validateAccount({ ...VALID_ACCOUNT, password: '' }).password, 'passwordTooShort');
  assert.equal(
    validateAccount({ ...VALID_ACCOUNT, password: 'curta12' }).password,
    'passwordTooShort',
  );
  assert.equal(validateAccount({ ...VALID_ACCOUNT, password: 'curta123' }).password, undefined);
});

test('the address is derived from the trade name, without accents', () => {
  assert.equal(deriveSubdomain('Doces da Yara'), 'doces-da-yara');
  assert.equal(deriveSubdomain('Talatona Electrónica'), 'talatona-electronica');
  assert.equal(deriveSubdomain('Café & Cia'), 'cafe-cia');
  assert.equal(deriveSubdomain('Loja com um nome muito muito comprido').length <= 24, true);
});

test('a name that cannot become an address fails on the name field', () => {
  assert.equal(validateAccount({ ...VALID_ACCOUNT, name: '!!' }).name, 'nameTooShortForAddress');
  assert.equal(validateAccount({ ...VALID_ACCOUNT, name: 'ab' }).name, 'nameTooShortForAddress');
  assert.equal(validateAccount({ ...VALID_ACCOUNT, name: 'Kia' }).name, undefined);
});

test('the account step no longer asks for an address or a category', () => {
  assert.deepEqual(Object.keys(validateAccount({ ...VALID_ACCOUNT, email: 'x' })), ['email']);
});

test('the tax step needs both the nif and the fiscal name', () => {
  assert.deepEqual(validateTax(VALID_TAX), {});
  assert.equal(validateTax({ ...VALID_TAX, nif: '54170' }).nif, 'nifTooShort');
  assert.equal(validateTax({ ...VALID_TAX, fiscalName: '' }).fiscalName, 'required');
  assert.equal(validateTax({ ...VALID_TAX, fiscalName: ' ' }).fiscalName, 'required');
});

test('the nif is complete at nine digits, whatever separators it carries', () => {
  assert.equal(isNifComplete('5417080912'), true);
  assert.equal(isNifComplete('541 708 091'), true);
  assert.equal(isNifComplete('54170'), false);
});

test('a rejected subdomain from the api lands on the trade name field', () => {
  assert.equal(toFormField('subdomain'), 'name');
  assert.equal(toFormField('whatsappPhone'), 'whatsappPhone');
  assert.equal(toFormField('fiscalName'), 'fiscalName');
  assert.equal(toFormField('primaryColor'), 'primaryColor');
});

test('an unknown field is not mapped — it becomes a general alert, not a field error', () => {
  assert.equal(toFormField('fieldThatDoesNotExist'), undefined);
  assert.equal(toFormField(undefined), undefined);
});
