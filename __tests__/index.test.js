import parser from "../html/src/parser.js";
import { test, expect } from '@jest/globals';
import { dirname } from 'node:path';
import fs from 'fs';
import url from 'url';
import path from 'path';

const fileName = url.fileURLToPath(import.meta.url);
const __dirname = dirname(fileName);

const getFixturePath = (nameFile) => path.join(__dirname, '..', '__fixtures__', nameFile);
const readFile = (nameFile) => fs.readFileSync(getFixturePath(nameFile), 'utf-8');

const testDefault = readFile('test1.txt');

const file1 = readFile('file1.json');
const file2 = readFile('file2.json');

test('json', () => {
    expect(parser(JSON.parse(file1), JSON.parse(file2))).toEqual(testDefault);
});

test('empty json', () => {
    expect(parser()).toEqual('');
});