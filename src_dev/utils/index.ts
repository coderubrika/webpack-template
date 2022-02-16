import {writeJson, readJson as read, ensureFile, remove} from 'fs-extra'

import {resolve} from 'path'

export async function readJson (filePath: string) {
    try {
        const configJson = await read(filePath)
        return configJson
        
    } catch (err) {
      console.error(err)
    }
}

export async function saveJson (filePath: string, data: any) {
    try {
      await writeJson(filePath, data, { spaces: '\t'})
    } catch (err) {
      console.error(err)
    }
}

export async function createFile (filePath: string, filename: string) {
    try {
      await ensureFile(resolve(filePath, filename))
    } catch (err) {
      console.error(err)
    }
  }
  
export async function removeFile (filePath: string, filename: string) {
    try {
        await remove(resolve(filePath, filename))
    } catch (err) {
        console.error(err)
    }
}
