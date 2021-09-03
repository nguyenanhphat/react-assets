import Sequelize from 'sequelize';
import modelNames from '../constants/modelNames';
import { User } from '../models/user';
import { Asset } from '../models/asset';
import { GenericOption } from '../models/genericOption';
import { Purchase } from '../models/purchase';
import { Specification } from '../models/specification';
import { UsageHistory } from '../models/usageHistory';
import { Attachment } from '../models/attachment';
import { MaintenanceHistory } from '../models/maintenanceHistory';
import { GeneralSetting } from '../models/generalSetting';

export class DBConnector {
    connection = null;

    models = null;

    init() {
      const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_SERVER,
        dialect: 'mssql',
        dialectOptions: {
          options: {
            useUTC: false,
            dateFirst: 1,
            encrypt: false,
          },
        },
      });
      const models = {
        [modelNames.User]: User.init(sequelize),
        [modelNames.Asset]: Asset.init(sequelize),
        [modelNames.GenericOption]: GenericOption.init(sequelize),
        [modelNames.Purchase]: Purchase.init(sequelize),
        [modelNames.Specification]: Specification.init(sequelize),
        [modelNames.UsageHistory]: UsageHistory.init(sequelize),
        [modelNames.Attachment]: Attachment.init(sequelize),
        [modelNames.MaintenanceHistory]: MaintenanceHistory.init(sequelize),
        [modelNames.GeneralSetting]: GeneralSetting.init(sequelize),
      };
      Object.keys(models).forEach(modelName => {
        if (models[modelName].associate) {
          models[modelName].associate(models);
        }
      });
      this.connection = sequelize;
      this.models = models;
    }
}
