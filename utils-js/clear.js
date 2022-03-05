const fs = require('fs-extra')

const  folders = process.argv.slice(2)

async function clearFolder(dir) {
    try {
        await fs.emptyDir(dir)
    }
    catch (e) {
        console.error(e);
    }
}

folders.forEach(async folder => clearFolder(folder))

module.exports = {
    clearFolder
}