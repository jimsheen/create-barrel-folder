import path from 'path';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { Config } from 'types/types';
import renderFile from '../renderFile';

const indexTmpl = path.resolve(__dirname, '../../templates/index.ejs');


export default async function createDirAndFiles (moduleName: string, config: Config) {
  const dirPath = path.join(process.cwd(), moduleName)

  if (!existsSync(dirPath)) {

    try {
      await mkdir(dirPath)
    }
    catch (err: any) {
      console.log('err :>> ', err);
      if (err.code !== 'EEXIST') throw err
    }
  } else {
    throw new Error('Directory already exists');
  }


  if (config.barrel) {
    let fileType = config.fileType === 'tsx' || config.fileType === 'ts' ? 'ts' : 'js';
    try {
      // await fs.writeFile(`${dirPath}/index.ts`, indexFile)
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

  if (config.type === 'rfc') {


  }

}
