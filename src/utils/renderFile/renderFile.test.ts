import ejs from 'ejs'
import path from 'path'
import renderFile from './renderFile'

const templatePath = path.resolve(__dirname, './testTemplate.ejs')
const mockRenderFile = jest.fn()

jest.spyOn(ejs, 'renderFile').mockImplementation(mockRenderFile as any)

test('should render a file and inject data and config to EJS template', () => {
  const dirPath = 'dirPath'
  const fileName = 'fileName'
  const moduleName = 'moduleName'
  const data: Record<string, unknown> = {}
  const options: Record<string, unknown> = {}

  renderFile({
    templatePath,
    dirPath,
    fileName,
    moduleName,
    data,
    options,
  })

  expect(mockRenderFile).toHaveBeenCalledWith(
    templatePath,
    {
      name: moduleName,
      ...data,
    },
    options,
    expect.any(Function)
  )
})
