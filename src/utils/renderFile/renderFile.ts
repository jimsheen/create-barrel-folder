import fs from 'fs'
import ejs, { Options } from 'ejs'
import { color } from 'console-log-colors'

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
        console.error(color.cyan.bgRed.bold.underline('Error'))

        throw err
      } else {
        fs.appendFile(
          `${dirPath}/${fileName}`,
          str,
          (err: NodeJS.ErrnoException | null) => {
            if (err) {
              console.error(color.cyan.bgRed.bold.underline('Error'))

              throw err
            }
            console.info(
              color.cyan.bgGreen.bold.underline(`Created ${fileName}`)
            )
          }
        )
      }
    }
  )
}

export default renderFile
