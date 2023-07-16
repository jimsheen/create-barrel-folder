import path from 'path'

import createDir from '../createDir'
import renderFile from '../renderFile'

import {
  EOptions,
  EComponentType,
  fileOptions,
  defaultTemplateData,
} from '../../constants'

import { TFileOptions } from '../../types'

const componentTemplate = path.resolve(
  __dirname,
  '../../templates/component.ejs'
)
const hookTemplate = path.resolve(__dirname, '../../templates/hook.ejs')
const indexTemplate = path.resolve(__dirname, '../../templates/index.ejs')
const styledTemplate = path.resolve(__dirname, '../../templates/styled.ejs')
const storyTemplate = path.resolve(__dirname, '../../templates/story.ejs')
const testTemplate = path.resolve(__dirname, '../../templates/test.ejs')

export type TCreateFilesOptions = {
  componentName: string
  componentType: EComponentType
  options: TFileOptions
}

const createFiles = async ({
  componentName,
  componentType,
  options,
}: TCreateFilesOptions): Promise<void> => {
  const dirPath = path.join(process.cwd(), componentName)

  // create dir
  try {
    await createDir(dirPath)
  } catch (err) {
    if (err) throw err
  }

  // if options doesn't have a value that matches the key in defaultTemplateData then it will be set to false
  const data = Object.keys(defaultTemplateData).reduce((acc, key) => {
    if (options.includes(key as EOptions)) {
      return {
        ...acc,
        [key]: true,
      }
    }

    return {
      ...acc,
      [key]: false,
    }
  }, {})

  // create files

  // create barrel file
  if (options.includes(fileOptions[EOptions.Barrel])) {
    const fileName = 'index.ts'

    renderFile({
      templatePath: indexTemplate,
      dirPath,
      fileName,
      moduleName: componentName,
    })
  }

  // create component file
  if (componentType === EComponentType.Component) {
    const fileName = `${componentName}.tsx`

    renderFile({
      templatePath: componentTemplate,
      dirPath,
      fileName,
      moduleName: componentName,
      data,
    })
  }

  // create hook file
  if (componentType === EComponentType.Hook) {
    const fileName = `use${componentName}.ts`

    renderFile({
      templatePath: hookTemplate,
      dirPath,
      fileName,
      moduleName: componentName,
      data,
    })
  }

  // create styled
  if (options.includes(fileOptions[EOptions.Styled])) {
    const fileName = `${componentName}.styled.ts`

    renderFile({
      templatePath: styledTemplate,
      dirPath,
      fileName,
      moduleName: componentName,
      data,
    })
  }

  // create story
  if (options.includes(fileOptions[EOptions.Story])) {
    const fileName = `${componentName}.stories.tsx`

    renderFile({
      templatePath: storyTemplate,
      dirPath,
      fileName,
      moduleName: componentName,
      data,
    })
  }

  // create test
  if (options.includes(fileOptions[EOptions.Test])) {
    const fileName = `${componentName}.test.tsx`

    renderFile({
      templatePath: testTemplate,
      dirPath,
      fileName,
      moduleName: componentName,
      data,
    })
  }
}

export default createFiles
