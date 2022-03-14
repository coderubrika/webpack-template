import {writeJson, readJson as read, ensureFile, ensureDir, remove} from 'fs-extra'

import fs from 'fs'

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

export async function readFile (filePath: string) {

  try {
    await ensureDir(resolve(filePath, '../'))
  }
  catch (err) {
    console.log(err)
  }

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8' , (err, data) => {
      if (err) {
        console.log(err)
      }    
       resolve(data);
    })
  })
}

export async function writeFile (filePath: string, content: any) {
  try {
    await ensureDir(resolve(filePath, '../'))
  }
  catch (err) {
    console.log(err)
  }
  
  fs.writeFile(filePath, content, err => {
    if (err) {
      console.log(err)
    }
  })
}

