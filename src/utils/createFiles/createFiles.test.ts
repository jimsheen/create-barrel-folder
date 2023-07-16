import { EOptions, EComponentType, fileOptions } from '../../constants'
import createFiles from '../createFiles'
import createDir from '../createDir'
import renderFile from '../renderFile'

// Mock the createDir and renderFile functions
jest.mock('../createDir')
jest.mock('../renderFile')

describe('createFiles', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    ;(createDir as jest.Mock).mockClear()
    ;(renderFile as jest.Mock).mockClear()
  })

  describe('component type', () => {
    it('creates component files correctly', async () => {
      const mockOptions = [
        fileOptions[EOptions.Barrel],
        fileOptions[EOptions.Styled],
      ]
      const mockComponentName = 'TestComponent'
      const mockComponentType = EComponentType.Component

      await createFiles({
        componentName: mockComponentName,
        componentType: mockComponentType,
        options: mockOptions,
      })

      // Test if renderFile is called correctly for '${componentName}.tsx'
      expect(renderFile).toBeCalledWith(
        expect.objectContaining({
          fileName: `${mockComponentName}.tsx`,
          moduleName: mockComponentName,
        })
      )
    })

    it('creates hook files correctly', async () => {
      const mockOptions = [
        fileOptions[EOptions.Barrel],
        fileOptions[EOptions.Styled],
      ]
      const mockComponentName = 'TestComponent'
      const mockComponentType = EComponentType.Hook

      await createFiles({
        componentName: mockComponentName,
        componentType: mockComponentType,
        options: mockOptions,
      })

      // Test if renderFile is called correctly for 'use${componentName}.ts'
      expect(renderFile).toBeCalledWith(
        expect.objectContaining({
          fileName: `use${mockComponentName}.ts`,
          moduleName: mockComponentName,
        })
      )
    })
  })

  describe('file options', () => {
    it('creates barrel files correctly', async () => {
      const mockOptions = [fileOptions[EOptions.Barrel]]
      const mockComponentName = 'TestComponent'
      const mockComponentType = EComponentType.Component

      await createFiles({
        componentName: mockComponentName,
        componentType: mockComponentType,
        options: mockOptions,
      })

      // Test if renderFile is called correctly for 'index.ts'
      expect(renderFile).toBeCalledWith(
        expect.objectContaining({
          fileName: 'index.ts',
          moduleName: mockComponentName,
        })
      )
    })

    it('creates styled files correctly', async () => {
      const mockOptions = [fileOptions[EOptions.Styled]]
      const mockComponentName = 'TestComponent'
      const mockComponentType = EComponentType.Component

      await createFiles({
        componentName: mockComponentName,
        componentType: mockComponentType,
        options: mockOptions,
      })

      // Test if renderFile is called correctly for '${componentName}.styled.ts'
      expect(renderFile).toBeCalledWith(
        expect.objectContaining({
          fileName: `${mockComponentName}.styled.ts`,
          moduleName: mockComponentName,
        })
      )
    })

    // Similarly you can add more test cases for EOptions.Story and EOptions.Test
  })
})
