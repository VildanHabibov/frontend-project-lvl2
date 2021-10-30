import { test, expect } from '@jest/globals'; // иначе ругается линтер
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getData = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

test('JSON big', () => {
  expect(genDiff(getFixturePath('first.json'), getFixturePath('second.json')))
    .toBe(getData('expectedStylish.txt'));
});

test('JSON big stylish', () => {
  expect(genDiff(getFixturePath('first.json'), getFixturePath('second.json'), 'stylish'))
    .toBe(getData('expectedStylish.txt'));
});

test('JSON big plain', () => {
  expect(genDiff(getFixturePath('first.json'), getFixturePath('second.json'), 'plain'))
    .toBe(getData('expectedPlain.txt'));
});

test('YAML big', () => {
  expect(genDiff(getFixturePath('first.yaml'), getFixturePath('second.yaml')))
    .toBe(getData('expectedStylish.txt'));
});

test('YAML big plain', () => {
  expect(genDiff(getFixturePath('first.yaml'), getFixturePath('second.yaml'), 'plain'))
    .toBe(getData('expectedPlain.txt'));
});

test('YAML big json', () => {
  expect(genDiff(getFixturePath('first.yaml'), getFixturePath('second.yaml'), 'json'))
    .toBe(getData('expectedJSON.txt'));
});
