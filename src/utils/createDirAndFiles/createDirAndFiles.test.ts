import fs from 'fs/promises';

import createDirAndFiles from '.';
import { Config } from 'types';

jest.mock('fs');

fs.mkdir = jest.fn();

const defaultConfig = {
  "fileType": "tsx",
  "typescript": true,
  "barrel": true,
  "scss": true,
  "test": true,
  "story": true,
} as Config

afterEach(() => {
  jest.clearAllMocks();
})

test('should throw error if dir already exists', async () => {
  const moduleName = 'moduleName';
  const config = defaultConfig;

  fs.mkdir = jest.fn().mockRejectedValue({ code: 'EEXIST' });

  expect(async () => await createDirAndFiles(moduleName, config)).rejects.toThrowError('Directory already exists');
})

