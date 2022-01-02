import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { Config } from 'types';

export interface renderFileProps {
  templatePath: string;
  dirPath: string;
  fileName: string;
  moduleName: string;
  config: Partial<Config>;
  data?: ejs.Data;
  options?: ejs.Options;
}

export default function renderFile ({
  templatePath,
  dirPath,
  moduleName,
  fileName,
  data,
  options = {},
  config,
}: renderFileProps) {

  const renderFileData = {
    name: moduleName,
    ...data,
    ...config,
  }

  ejs.renderFile(templatePath, renderFileData, options, (err: any, str: any) => {
    console.log('str :>> ', str);
    console.log('err :>> ', err);
    if (err) {
      throw err;
    } else {
      fs.appendFile(`${dirPath}/${fileName}`, str, function (err) {
        if (err) throw err;
        console.log(`Created ${fileName}`);
      });
    }
  });
}
