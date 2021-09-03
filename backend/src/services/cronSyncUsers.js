import { CronJob } from 'cron';
import dependencyNames from '../constants/dependencyNames';

export class CronSyncUsers {
  constructor(beans) {
    this.userService = beans[dependencyNames.userService];
  }

  start = () => {
    const cronJob = new CronJob({
      cronTime: '0 10 * * *',
      onTick: () => {
        this.userService.syncUserFromIdentitySystem()
          .then(result => console.info(result))
          .catch(err => { console.error(err); });
      },
      start: true,
      timeZone: 'Asia/Ho_Chi_Minh',
    });
    cronJob.start();
  };
}
