import 'dotenv/config';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'allsettled-polyfill';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import i18n from 'i18n';
import { createContainer, asClass } from 'awilix';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import appRoutes from './routes';
import { DBConnector } from './services/database';
import { Injection } from './injection';
import dependencyNames from './constants/dependencyNames';
import swaggerDefinition from './swaggerDocument/swaggerDefinition';

const router = express.Router();

const container = createContainer();
container.register({
  [dependencyNames.database]: asClass(DBConnector).singleton(),
});

async function startApp() {
  // db connection
  const database = Injection.getService(container, dependencyNames.database);
  database.init();
  await database.connection.authenticate();

  // inject services to container
  Injection.injectServices(container);

  // google-apis
  const googleApis = Injection.getService(container, dependencyNames.googleApis);
  await googleApis.authenticateGoogleDrive();

  // grant permission to access google drive for all user domain saigontechnology.com
  const permission = { type: 'domain', role: 'reader', domain: 'saigontechnology.com' };
  await googleApis.addPermission(process.env.GOOGLE_DRIVE_ROOT_FOLDER, permission);
  const permissions = await googleApis.getPermissions(process.env.GOOGLE_DRIVE_ROOT_FOLDER);
  console.info(permissions);

  // generate type and sub-type folder ids
  const genericOptionService = Injection.getService(container, dependencyNames.genericOptionService);
  await genericOptionService.updateGoogleDriveIDsOfTypes();

  // cron-job users
  const cronSyncUsers = Injection.getService(container, dependencyNames.cronJobUsers);
  cronSyncUsers.start();

  // app initial
  const PORT = process.env.PORT || 3000;
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  i18n.configure({
    locales: ['en', 'de'],
    directory: `${__dirname}/locales`,
    defaultLocale: 'en',
  });
  app.use(i18n.init);

  app.use((req, res, next) => {
    // add _containerDI to req object
    req._containerDI = container;
    next();
  });

  if (process.env.SWAGGER_ENABLE) {
    const options = {
      swaggerDefinition,
      apis: [],
    };

    const swaggerSpec = swaggerJSDoc(options);
    router.use('/api-docs', swaggerUi.serve);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  appRoutes(app);

  app.listen(PORT, () => {
    console.info(`Server running on http://localhost:${PORT}/`);
  });
}

startApp().then(() => {
  console.info('Server start successfully');
}).catch(error => console.info('Server start fail', error));

// await googleApis.deleteFolder(rootId);
// const { id } = await googleApis.createFolder('root');
// console.log(id);
// update process.env.GG_DRIVE_ROOT_FOLDER = id before call below function
// const genericOptionService = Injection.getService(container, dependencyNames.genericOptionService);
// await genericOptionService.updateGoogleDriveIDsOfTypes();
