import ejs from 'ejs';
import fs from 'fs';
import path from 'path';

import renderFile from './renderFile';

const templatePath = path.resolve(__dirname, './testTemplate.ejs')

const defaultConfig = require('../../config.json');

const mockRenderFile = jest.fn();

jest.spyOn(ejs, "renderFile").mockImplementation(mockRenderFile)

test('should render a file and inject data and config to EJS template', () => {

  // const templatePath = templatePath;
  const dirPath = 'dirPath';
  const fileName = 'fileName';
  const moduleName = 'moduleName';
  const data = {};
  const options = {};
  const config = {};
  renderFile({
    templatePath,
    dirPath,
    fileName,
    moduleName,
    data,
    options,
    config
  })

  expect(mockRenderFile).toHaveBeenCalledWith(templatePath, {
    name: moduleName,
    ...data,
  }, options, expect.any(Function));
})
