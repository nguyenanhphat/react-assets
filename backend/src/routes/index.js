import { responseApi } from '../utils/response';
import user from './user';
import asset from './asset';
import genericOption from './genericOption';
import usageHistory from './usageHistory';
import maintenanceHistory from './maintenanceHistory';
import myAssets from './myAssets';
import uploadFiles from './uploadFiles';
import generalSetting from './generalSetting';

const routes = app => {
  app.get('/', (req, res) => {
    responseApi(res, 200, {
      data: null,
      message: 'Welcome to the AUTHENTICATION API. Register or Login to test Authentication.',
      errorCode: null,
    });
  });
  app.use('/api/user', user);
  app.use('/api/asset', asset);
  app.use('/api/genericOption', genericOption);
  app.use('/api/myAssets', myAssets);
  app.use('/api/usageHistories', usageHistory);
  app.use('/api/maintenanceHistories', maintenanceHistory);
  app.use('/api/uploadFiles', uploadFiles);
  app.use('/api/generalSettings', generalSetting);
  app.get('*', (req, res) => {
    res.status(404).json({ success: false, data: null, errorCode: 404, message: '' });
  });
  // the middleware to handle exceptions
  app.use((error, req, res, next) => {
    res
      .status(error.code || 500)
      .json({ success: false, data: null, errorCode: error.code || 500, message: error.message });
  });
};

export default routes;
