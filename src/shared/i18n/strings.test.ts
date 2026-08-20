import assert from 'node:assert/strict';
import { test } from 'node:test';

import { strings } from './strings.ts';

test('visible strings are written in portuguese', () => {
  assert.equal(strings.app.name, 'WIZA');
  assert.equal(strings.nav.summary, 'Resumo');
  assert.ok(strings.summary.subtitle.length > 0);
});

test('phone prefix and domain suffix follow the angolan domain', () => {
  assert.equal(strings.onboarding.phonePrefix, '+244');
  assert.equal(strings.onboarding.domainSuffix, '.wiza.ao');
});
