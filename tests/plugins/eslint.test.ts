import assert from 'node:assert/strict';
import test from 'node:test';
import * as eslint from '../../src/plugins/eslint/index.js';
import { resolve, join } from '../../src/util/path.js';
import { getManifest } from '../helpers/index.js';

const cwd = resolve('fixtures/plugins/eslint');
const manifest = getManifest(cwd);

test('Find dependencies in ESLint configuration (legacy json)', async () => {
  const configFilePath = join(cwd, '.eslintrc.json');
  const dependencies = await eslint.findDependencies(configFilePath, { cwd, manifest });
  assert.deepEqual(dependencies, [
    join(cwd, 'base.eslint.json'),
    'eslint-plugin-import',
    '@typescript-eslint/parser',
    'eslint-config-airbnb',
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-prettier',
    'eslint-config-prettier',
    '@babel/plugin-syntax-import-assertions',
  ]);
});

test('Find dependencies in ESLint configuration (legacy js)', async () => {
  const configFilePath = join(cwd, '.eslintrc.js');
  const dependencies = await eslint.findDependencies(configFilePath, { cwd, manifest });
  assert.deepEqual(dependencies, [
    join(cwd, 'base.eslint.json'),
    'eslint-plugin-import',
    '@typescript-eslint/parser',
    'eslint-config-airbnb',
    '@typescript-eslint/eslint-plugin',
    'eslint-config-next',
    '@next/eslint-plugin-next',
    'eslint-plugin-eslint-comments',
    'eslint-plugin-eslint-plugin',
    '@scope/eslint-config/file',
    'eslint-plugin-prettier',
    'eslint-config-prettier',
    '@nrwl/eslint-plugin-nx',
    'eslint-plugin-cypress',
    '@scope/eslint-plugin',
    'eslint-import-resolver-typescript',
    'eslint-import-resolver-exports',
  ]);
});

test('Find dependencies in ESLint configuration (legacy yaml)', async () => {
  const configFilePath = join(cwd, '.eslintrc.yml');
  const dependencies = await eslint.findDependencies(configFilePath, { cwd, manifest });
  assert.deepEqual(dependencies, ['@sinonjs/eslint-config', '@sinonjs/eslint-plugin-no-prototype-methods']);
});
