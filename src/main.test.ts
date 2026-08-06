import assert from 'node:assert/strict';
import { test } from 'node:test';

import { APP_NAME, bootstrapBanner } from './main.ts';

test('o banner identifica a aplicação', () => {
  assert.ok(bootstrapBanner().startsWith(`${APP_NAME}:`));
});
