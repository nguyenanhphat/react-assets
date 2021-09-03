import { asClass } from 'awilix';
import dependencyNames from './constants/dependencyNames';
import { CronSyncUsers } from './services/cronSyncUsers';
import { CronSyncTypes } from './services/cronSyncTypes';
import GoogleApis from './services/googleApis';

import { UserService } from './services/user';
import { AssetService } from './services/asset';
import { AssetManagementService } from './services/assetManagement';
import { UsageHistoryService } from './services/usageHistory';
import { MaintenanceHistoryService } from './services/maintenanceHistory';
import AssetRepository from './repositories/asset';
import UsageHistoryRepository from './repositories/usageHistory';
import UserRepository from './repositories/user';

import GenericOptionRepository from './genericOptions/GenericOptionRepository';
import GenericOptionService from './genericOptions/GenericOptionService';

import AttachmentRepository from './attachments/AttachmentRepository';
import AttachmentService from './attachments/AttachmentService';

import GeneralSettingRepository from './generalSettings/GeneralSettingRepository';
import GeneralSettingService from './generalSettings/GeneralSettingService';

export class Injection {
  static injectServices(container) {
    container.register({
      [dependencyNames.cronJobUsers]: asClass(CronSyncUsers).singleton(),
      [dependencyNames.cronSyncTypes]: asClass(CronSyncTypes).singleton(),
      [dependencyNames.googleApis]: asClass(GoogleApis).singleton(),

      // repositories
      [dependencyNames.userRepository]: asClass(UserRepository).singleton(),
      [dependencyNames.assetRepository]: asClass(AssetRepository).singleton(),
      [dependencyNames.usageHistoryRepository]: asClass(UsageHistoryRepository).singleton(),
      [dependencyNames.genericOptionRepository]: asClass(GenericOptionRepository).singleton(),
      [dependencyNames.attachmentRepository]: asClass(AttachmentRepository).singleton(),
      [dependencyNames.generalSettingRepository]: asClass(GeneralSettingRepository).singleton(),
      // services
      [dependencyNames.userService]: asClass(UserService).singleton(),
      [dependencyNames.assetService]: asClass(AssetService).singleton(),
      [dependencyNames.assetManagementService]: asClass(AssetManagementService).singleton(),
      [dependencyNames.usageHistoryService]: asClass(UsageHistoryService).singleton(),
      [dependencyNames.maintenanceHistoryService]: asClass(MaintenanceHistoryService).singleton(),
      [dependencyNames.genericOptionService]: asClass(GenericOptionService).singleton(),
      [dependencyNames.genericOptionService]: asClass(GenericOptionService).singleton(),
      [dependencyNames.attachmentService]: asClass(AttachmentService).singleton(),
      [dependencyNames.generalSettingService]: asClass(GeneralSettingService).singleton(),
    });
  }

  static getService(container, dependencyName) {
    return container.resolve(dependencyName);
  }
}
