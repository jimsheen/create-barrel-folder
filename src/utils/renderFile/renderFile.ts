import fs from 'fs'
import ejs, { Options } from 'ejs'

interface RenderFileProps {
  templatePath: string
  dirPath: string
  moduleName: string
  fileName: string
  data?: Record<string, unknown>
  options?: Options
}

function renderFile({
  templatePath,
  dirPath,
  moduleName,
  fileName,
  data = {},
  options = {},
}: RenderFileProps): void {
  const renderFileData = {
    name: moduleName,
    ...data,
  }

  ejs.renderFile(
    templatePath,
    renderFileData,
    options,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (err: any, str: string) => {
      if (err) {
        throw err
      } else {
        fs.appendFile(
          `${dirPath}/${fileName}`,
          str,
          (err: NodeJS.ErrnoException | null) => {
            if (err) throw err
            console.log(`Created ${fileName}`)
          }
        )
      }
    }
  )
}

export default renderFile
