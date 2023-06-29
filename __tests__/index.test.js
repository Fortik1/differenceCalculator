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
const testParser = readFile('testParser.txt');

const file1 = JSON.parse(readFile('file1.json'));
const file2 = JSON.parse(readFile('file2.json'));

test('json', () => {
    parser(file1, file2) === testDefault;
});

test('empty json', () => {
    expect(parser()).toEqual('');
});

test('test parser', () => {
    parser(file1) === testParser;
});
