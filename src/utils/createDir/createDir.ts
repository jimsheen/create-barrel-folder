import { mkdir } from 'fs/promises'

const createDir = async (dirPath: string): Promise<string> => {
  try {
    await mkdir(dirPath)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.code === 'EEXIST') {
      throw new Error('Directory already exists')
    }
    if (err.code !== 'EEXIST') {
      throw err
    }
  }
  return dirPath
}

export default createDir
