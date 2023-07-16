import { mkdir } from 'fs/promises'
import createDir from '.'

// Mock fs/promises
jest.mock('fs/promises', () => ({
  mkdir: jest.fn(),
}))

describe('createDir', () => {
  beforeEach(() => {
    ;(mkdir as jest.Mock).mockClear()
  })

  it('creates directory successfully', async () => {
    ;(mkdir as jest.Mock).mockResolvedValue(undefined) // Successful directory creation
    const testDirPath = '/path/to/testDir'
    const result = await createDir(testDirPath)
    expect(mkdir).toHaveBeenCalledWith(testDirPath)
    expect(result).toEqual(testDirPath)
  })

  it('throws an error if directory already exists', async () => {
    ;(mkdir as jest.Mock).mockRejectedValue({ code: 'EEXIST' }) // Directory already exists
    const testDirPath = '/path/to/testDir'
    await expect(createDir(testDirPath)).rejects.toThrow(
      'Directory already exists'
    )
    expect(mkdir).toHaveBeenCalledWith(testDirPath)
  })

  it('throws an error if an unexpected error occurs', async () => {
    const unexpectedError = new Error('Unexpected error')
    ;(mkdir as jest.Mock).mockRejectedValue(unexpectedError) // Some unexpected error occurred
    const testDirPath = '/path/to/testDir'
    await expect(createDir(testDirPath)).rejects.toThrow(unexpectedError)
    expect(mkdir).toHaveBeenCalledWith(testDirPath)
  })
})
