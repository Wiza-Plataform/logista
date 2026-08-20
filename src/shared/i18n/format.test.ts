import assert from 'node:assert/strict';
import { test } from 'node:test';

import { formatKwanza, formatPhoneAO, isCompletePhoneAO, toLocalPhoneAO } from './format.ts';

test('kwanza uses a dot for thousands and the suffix after the number', () => {
  assert.equal(formatKwanza(4250000), '42.500 Kz');
  assert.equal(formatKwanza(150000000), '1.500.000 Kz');
  assert.equal(formatKwanza(0), '0 Kz');
});

test('kwanza keeps cents only when they are not zero', () => {
  assert.equal(formatKwanza(4250050), '42.500,50 Kz');
  assert.equal(formatKwanza(-4250050), '-42.500,50 Kz');
});

test('angolan phone is grouped in threes after the country code', () => {
  assert.equal(formatPhoneAO('923000000'), '+244 923 000 000');
  assert.equal(formatPhoneAO('+244 923 000 000'), '+244 923 000 000');
  assert.equal(formatPhoneAO(''), '+244');
});

test('local phone drops the country code and extra digits', () => {
  assert.equal(toLocalPhoneAO('244923000000'), '923000000');
  assert.equal(toLocalPhoneAO('923 000 000 12'), '923000000');
  assert.ok(isCompletePhoneAO('+244 923 000 000'));
  assert.ok(!isCompletePhoneAO('923 000'));
});
