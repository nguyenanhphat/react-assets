import { CronJob } from 'cron';
import dependencyNames from '../constants/dependencyNames';

export class CronSyncTypes {
  constructor(beans) {
    this.genericOptionService = beans[dependencyNames.genericOptionService];
  }

  start = () => {
    const cronJob = new CronJob({
      cronTime: '0 10 5 * *',
      onTick: () => {
        this.genericOptionService.updateGoogleDriveIDsOfTypes()
          .then(result => result && console.info('CronSyncTypes success'))
          .catch(err => { console.error(err); });
      },
      start: true,
      timeZone: 'Asia/Ho_Chi_Minh',
    });
    cronJob.start();
  };
}
