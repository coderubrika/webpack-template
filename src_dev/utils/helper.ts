import {saveJson, readJson, createFile, removeFile as removeFileOrDir} from './index'
import config from 'config'


export async function helper(args: string[]) {
    const command: string = args[0]

    switch (command) {
        case "add": {
            await add(args.slice(1))
            break
        }
    
        case "remove": {
            remove(args.slice(1))
            break
        }
    
        default: {
            console.error(`Wrong command: ${command}`);
        }
    }
}



async function add(args: string[]) {
    const operator = args[0]

    switch(operator) {
        case "page": {
            const chanks = args.slice(1)

            const configPath: string = config.get('projectSettings.configPath')
            const entriesPath: string = config.get('projectSettings.entriesPath')
            const pagesPath: string = config.get('projectSettings.pagesPath')
            
            const configJson = await readJson(configPath)

            for (const chank of chanks) {
                await createFile(pagesPath, `${chank}.html`)
                await createFile(entriesPath, `${chank}.ts`)
                configJson.projectSettings.pages.push(chank)
            }

            await saveJson(configPath, configJson)

            break
        }

        default: {
            console.error(`Wrong operator: ${operator}`);
        }
    }
}

async function remove(args: string[]) {
    const operator = args[0]

    switch(operator) {
        case "page": {
            const chanks = args.slice(1)
            
            const configPath: string = config.get('projectSettings.configPath')
            const entriesPath: string = config.get('projectSettings.entriesPath')
            const pagesPath: string = config.get('projectSettings.pagesPath')
            
            const configJson = await readJson(configPath)

            if (chanks.length == 1 && chanks[0] == '*') {
                configJson.projectSettings.pages.forEach( async (page: string) => {
                    await removeFileOrDir(pagesPath, `${page}.html`)
                    await removeFileOrDir(entriesPath, `${page}.ts`)
                });
                configJson.projectSettings.pages = []
            }

            else {
                for (const chank of chanks) {
                    await removeFileOrDir(pagesPath, `${chank}.html`)
                    await removeFileOrDir(entriesPath, `${chank}.ts`)
                    configJson.projectSettings.pages = configJson.projectSettings.pages.filter((item: string) => item !== chank)
                }
            }
            

            await saveJson(configPath, configJson)
            
            break
        }

        default: {
            console.error(`Wrong operator: ${operator}`);
        }
    }
}