import assert from 'node:assert/strict';
import { test } from 'node:test';

import { initials, shortName } from './merchant-identity.ts';

test('short name keeps the first and the last name', () => {
  assert.equal(shortName('Yara Domingas Kiala'), 'Yara Kiala');
  assert.equal(shortName('Yara Kiala'), 'Yara Kiala');
  assert.equal(shortName('Maria da Conceição António'), 'Maria António');
});

test('short name copes with a single name and stray spaces', () => {
  assert.equal(shortName('  Yara  '), 'Yara');
  assert.equal(shortName('Yara   Domingas\tKiala '), 'Yara Kiala');
  assert.equal(shortName('   '), '');
});

test('initials come from the first and the last name, in capitals', () => {
  assert.equal(initials('Yara Domingas Kiala'), 'YK');
  assert.equal(initials('élio da silva'), 'ÉS');
  assert.equal(initials('Yara'), 'Y');
  assert.equal(initials(''), '');
});
