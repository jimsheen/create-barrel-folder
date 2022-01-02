import path from 'path';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { Config } from 'types';
import renderFile from '../renderFile';

const indexTmpl = path.resolve(__dirname, '../../templates/index.ejs');


export default async function createDirAndFiles (moduleName: string, config: Config) {
  const dirPath = path.join(process.cwd(), moduleName)

  try {
    await mkdir(dirPath)
  }
  catch (err: any) {
    if (err.code === 'EEXIST') {
      throw new Error('Directory already exists');
    }
    if (err.code !== 'EEXIST') throw err
  }

  const isHook = config.type === 'hook';


  if (config.barrel) {
    let fileType = config.fileType === 'tsx' || config.fileType === 'ts' ? 'ts' : 'js';
    try {
      renderFile({
        templatePath: indexTmpl,
        dirPath,
        fileName: `index.${fileType}`,
        moduleName,
        config
      })
    }
    catch (err: any) {
      if (err) throw err
    }
  }

  // react functional component
  if (config.type === 'rfc') {
    // TODO - add tsx condition
    const rfcTmpl = path.resolve(__dirname, '../../templates/rfc-tsx.ejs');
    try {
      renderFile({
        templatePath: rfcTmpl,
        dirPath,
        fileName: `${moduleName}.${config.reactFileType}`,
        moduleName,
        config
      })
    }
    catch (err: any) {
      if (err) throw err
    }
  }

  // create hook file
  if (isHook && config.typescript) {
    const hookTmpl = path.resolve(__dirname, '../../templates/hook-tsx.ejs');
    try {
      renderFile({
        templatePath: hookTmpl,
        dirPath,
        fileName: `${moduleName}.tsx`,
        moduleName,
        config
      })
    }
    catch (err: any) {
      if (err) throw err
    }
  }

  // test file with jest and testing library
  if (config.test) {
    const testTmpl = path.resolve(__dirname, '../../templates/test-tsx.ejs');
    try {
      renderFile({
        templatePath: testTmpl,
        dirPath,
        fileName: `${moduleName}.test.${config.fileType}`,
        moduleName,
        config
      })
    }
    catch (err: any) {
      if (err) throw err
    }
  }

  // storybook story for component
  if (config.story) {
    const storyTmpl = path.resolve(__dirname, '../../templates/story-tsx.ejs');
    try {
      renderFile({
        templatePath: storyTmpl,
        dirPath,
        fileName: `${moduleName}.stories.${config.fileType}`,
        moduleName,
        config
      })
    }
    catch (err: any) {
      if (err) throw err
    }
  }

  // scss style file
  if (config.scss) {
    const scssTmpl = path.resolve(__dirname, '../../templates/scss.ejs');
    try {
      renderFile({
        templatePath: scssTmpl,
        dirPath,
        fileName: `${moduleName}.scss`,
        moduleName,
        config
      })
    }
    catch (err: any) {
      if (err) throw err
    }
  }

}
