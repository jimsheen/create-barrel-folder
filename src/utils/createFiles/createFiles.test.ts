import path from 'path'
import { EComponentType, EOptions } from '../../constants'
import createFiles, { TCreateFilesOptions } from './createFiles'

jest.mock('../createDir', () => jest.fn())
jest.mock('../renderFile', () => jest.fn())

const createDirMock = require('../createDir')
const renderFileMock = require('../renderFile')

describe('createFiles', () => {
  let options: TCreateFilesOptions

  beforeEach(() => {
    // Reset the mock calls before each test
    createDirMock.mockClear()
    renderFileMock.mockClear()

    // Default options
    options = {
      componentName: 'MyComponent',
      componentType: EComponentType.Component,
      options: [],
    }
  })

  it('creates a directory', async () => {
    await createFiles(options)
    expect(createDirMock).toHaveBeenCalledWith(
      path.join(process.cwd(), options.componentName)
    )
  })

  describe('component type', () => {
    beforeEach(() => {
      options.componentType = EComponentType.Component
    })

    it('creates a barrel file', async () => {
      options.options.push(EOptions.Barrel)
      await createFiles(options)
      expect(renderFileMock).toHaveBeenCalledWith({
        templatePath: expect.any(String),
        dirPath: path.join(process.cwd(), options.componentName),
        fileName: 'index.ts',
        moduleName: options.componentName,
      })
    })

    it('creates a component file', async () => {
      await createFiles(options)
      expect(renderFileMock).toHaveBeenCalledWith({
        templatePath: expect.any(String),
        dirPath: path.join(process.cwd(), options.componentName),
        fileName: `${options.componentName}.tsx`,
        moduleName: options.componentName,
        data: expect.any(Object),
      })
    })

    it('creates a styled component file', async () => {
      options.options.push(EOptions.Styled)
      await createFiles(options)
      expect(renderFileMock).toHaveBeenCalledWith({
        templatePath: expect.any(String),
        dirPath: path.join(process.cwd(), options.componentName),
        fileName: `${options.componentName}.styled.ts`,
        moduleName: options.componentName,
        data: expect.any(Object),
      })
    })

    it('creates a story file', async () => {
      options.options.push(EOptions.Story)
      await createFiles(options)
      expect(renderFileMock).toHaveBeenCalledWith({
        templatePath: expect.any(String),
        dirPath: path.join(process.cwd(), options.componentName),
        fileName: `${options.componentName}.stories.tsx`,
        moduleName: options.componentName,
        data: expect.any(Object),
      })
    })

    it('creates a test file', async () => {
      options.options.push(EOptions.Test)
      await createFiles(options)
      expect(renderFileMock).toHaveBeenCalledWith({
        templatePath: expect.any(String),
        dirPath: path.join(process.cwd(), options.componentName),
        fileName: `${options.componentName}.test.tsx`,
        moduleName: options.componentName,
        data: expect.any(Object),
      })
    })
  })

  describe('hook type', () => {
    beforeEach(() => {
      options.componentType = EComponentType.Hook
    })

    it('creates a barrel file', async () => {
      options.options.push(EOptions.Barrel)
      await createFiles(options)
      expect(renderFileMock).toHaveBeenCalledWith({
        templatePath: expect.any(String),
        dirPath: path.join(process.cwd(), options.componentName),
        fileName: 'index.ts',
        moduleName: options.componentName,
      })
    })

    it('creates a hook file', async () => {
      await createFiles(options)
      expect(renderFileMock).toHaveBeenCalledWith({
        templatePath: expect.any(String),
        dirPath: path.join(process.cwd(), options.componentName),
        fileName: `use${options.componentName}.ts`,
        moduleName: options.componentName,
        data: expect.any(Object),
      })
    })

    it('creates a test file', async () => {
      options.options.push(EOptions.Test)
      await createFiles(options)
      expect(renderFileMock).toHaveBeenCalledWith({
        templatePath: expect.any(String),
        dirPath: path.join(process.cwd(), options.componentName),
        fileName: `${options.componentName}.test.tsx`,
        moduleName: options.componentName,
        data: expect.any(Object),
      })
    })
  })
})
