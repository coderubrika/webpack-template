import {initScript} from './utils/init'
import {helper} from './utils/helper'
import config from 'config'

const args = process.argv.slice(2)

const command = args[0];

// если в config в projectSettings не определен dirname его нужно определить
// сам путь находится в process.env[INIT_CWD]

switch(command) {
    case "init": {
        initScript(process.env['INIT_CWD'] as string);
        break;
    }
    case "helper": {
        helper(args.slice(1))
        break;
    }
    default: {
        console.error(`'${command}' is wrong command`)
    }
}

