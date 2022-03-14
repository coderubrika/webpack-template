import * as path from 'path'

import {readJson, saveJson} from './index'

export async function initScript(rootPath: string) {
    const srcPath = path.resolve(rootPath, 'src')

    const pagesPath = path.resolve(srcPath, 'pages')
    const entriesPath = path.resolve(srcPath, 'entries')

    const endpointsPath = path.resolve(srcPath, 'endpoints')

    const configPath = path.resolve(rootPath, 'config/default.json')

    const templatesPath = path.resolve(rootPath, 'templates')

    const configJson = await readJson(configPath)

    configJson.projectSettings['rootPath'] = rootPath
    configJson.projectSettings['configPath'] = configPath
    configJson.projectSettings['srcPath'] = srcPath
    configJson.projectSettings['pagesPath'] = pagesPath
    configJson.projectSettings['entriesPath'] = entriesPath
    configJson.projectSettings['endpointsPath'] = endpointsPath
    configJson.projectSettings['templatesPath'] = templatesPath

    saveJson(configPath, configJson)
}
  