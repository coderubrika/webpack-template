import {saveJson, readJson, readFile, writeFile, createFile, removeFile as removeFileOrDir} from './index'
import config from 'config'
import path from 'path'

import {handlebars} from 'hbs'

// какие есть текущие проблемы
// слишком много дублирующего кода
// создаются пустые файлы
// нет возможности добавлять реакт компонентны в проект
// полагаю хелпер нужно перевести в сторону ооп

export async function helper(args: string[]) {
    const command: string = args[0]

    switch (command) {
        case "to": {
            await to(args.slice(1))
        }

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

async function compileHTML(chank: string) {
    const templatesPath: string = config.get('projectSettings.templatesPath')

    const templateName = 'main.hbs'

    const templatePath = path.resolve(templatesPath, templateName);    

    const templateFile = await readFile(templatePath)
    
    const hbsTemplete = handlebars.compile(templateFile)

    return hbsTemplete({title: chank, body: ''})
}

async function to(args: string[]) {
    const chank = args[0]

    /**
     * может быть 
     * to chankName1, chankName2
     * to endpoint chankName1, chankName2
     * to page chankName1, chankName2
     * to *
     * to page *
     * to endpoint *
     * to 
     */
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

                const content = await compileHTML(chank)
                const htmlPath = path.resolve(pagesPath, `${chank}.html`)
                
                await writeFile(htmlPath, content)
                await createFile(entriesPath, `${chank}.ts`)

                configJson.projectSettings.pages.push(chank)
            }

            await saveJson(configPath, configJson)

            break
        }
        case "endpoint": {
            const chanks = args.slice(1)

            const configPath: string = config.get('projectSettings.configPath')
            const endpointsPath: string = config.get('projectSettings.endpointsPath')
            
            const configJson = await readJson(configPath)

            for (const chank of chanks) {
                const endpointPath = path.resolve(endpointsPath, chank)
                
                const content = await compileHTML(chank)
                const htmlPath = path.resolve(endpointPath, `${chank}.html`)
                
                await writeFile(htmlPath, content)
                await createFile(endpointPath, `index.ts`)

                configJson.projectSettings.endpoints.push(chank)
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
        case "endpoint": {
            const chanks = args.slice(1)
            
            const configPath: string = config.get('projectSettings.configPath')
            const endpointsPath: string = config.get('projectSettings.endpointsPath')
            
            const configJson = await readJson(configPath)

            if (chanks.length == 1 && chanks[0] == '*') {
                configJson.projectSettings.endpoints.forEach( async (chank: string) => {
                    await removeFileOrDir(endpointsPath, chank)
                });
                configJson.projectSettings.endpoints = []
            }

            else {
                for (const chank of chanks) {
                    await removeFileOrDir(endpointsPath, chank)
                    configJson.projectSettings.endpoints = configJson.projectSettings.endpoints.filter((item: string) => item !== chank)
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