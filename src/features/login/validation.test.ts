import assert from 'node:assert/strict';
import { test } from 'node:test';

import { fieldsBlamedBy, invalidSignInFields, signInProblem, toSignInField } from './validation.ts';

test('email and password filled report no invalid field', () => {
  assert.deepEqual(invalidSignInFields(' yara@lojakianda.ao ', 'qualquer'), []);
});

test('an empty form marks both fields', () => {
  assert.deepEqual(invalidSignInFields('', ''), ['email', 'password']);
});

test('an email without a domain is refused before calling the api', () => {
  assert.deepEqual(invalidSignInFields('yara@lojakianda', 'qualquer'), ['email']);
});

test('the password is not checked for length: old accounts must still get in', () => {
  assert.deepEqual(invalidSignInFields('yara@lojakianda.ao', 'x'), []);
});

test('the alert names every invalid field in one message', () => {
  assert.equal(signInProblem(['email', 'password']), 'emailAndPassword');
  assert.equal(signInProblem(['email']), 'email');
  assert.equal(signInProblem(['password']), 'password');
  assert.equal(signInProblem([]), null);
});

test('only email and password are fields the api can blame', () => {
  assert.equal(toSignInField('email'), 'email');
  assert.equal(toSignInField('password'), 'password');
  assert.equal(toSignInField(undefined), undefined);
  assert.equal(toSignInField('name'), undefined);
});

test('wrong credentials mark the password, as in the prototype', () => {
  assert.deepEqual(fieldsBlamedBy({ status: 401, message: 'Email ou palavra-passe incorretos.' }), [
    'password',
  ]);
});

test('a field named by the api wins over the status', () => {
  assert.deepEqual(fieldsBlamedBy({ status: 400, field: 'email', message: 'Email inválido.' }), [
    'email',
  ]);
});

test('lockout and network failures mark no field', () => {
  assert.deepEqual(fieldsBlamedBy({ status: 429, message: 'Demasiadas tentativas.' }), []);
  assert.deepEqual(fieldsBlamedBy({ status: 0, message: 'Sem ligação.' }), []);
});
