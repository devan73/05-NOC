import { Server } from './presentation/server'
import { CronJob } from 'cron';
import 'dotenv/config'
import { envs } from './config/plugins/envs.plugin';

(() => {
    main();
})();

function main() {
    // Server.start();
    // console.log(envs)
}