import express from 'express';
import YAML from 'yamljs';
import * as OpenApiValidator from 'express-openapi-validator';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import db from './db/mongo';
import * as sensorsHandler from './routes/sensors-handler';
import * as dataHandler from './routes/data-handler';

const PATH_PREFIX = '/v1';

export const app = express();
const swaggerDocument = YAML.load(
  path.join(__dirname, '..', 'spec', 'index.yaml')
);

app.use(express.json());

app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerDocument,
    validateApiSpec: true,
    validateRequests: true,
    validateResponses: false,
    formats: [
      // added to accommodate a custom format in the kube specs (io.k8s.apimachinery.pkg.util.intstr.IntOrString)
      {
        name: 'int-or-string',
        validate: (v) => typeof v === 'string' || typeof v === 'number'
      }
    ],
    // set to false to stop openapi-validator fiddling with the multipart requests
    fileUploader: false
  })
);

app.use(
  '/api-docs',
  (req: any, res: express.Response, next: express.NextFunction) => {
    const host = req.get('host');
    swaggerDocument.servers.unshift({
      url: `http://${host}${PATH_PREFIX}`,
      description: 'Server this api-doc was loaded from'
    });
    req.swaggerDoc = swaggerDocument;
    next();
  },
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.get(
  `${PATH_PREFIX}/health`,
  (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: 'ok' });
  }
);

app.get(`${PATH_PREFIX}/sensors`, sensorsHandler.listSensors);
app.post(`${PATH_PREFIX}/sensors`, sensorsHandler.addSensor);
app.get(`${PATH_PREFIX}/sensors/:sensorId`, sensorsHandler.getSensor);
app.put(`${PATH_PREFIX}/sensors/:sensorId`, sensorsHandler.editSensor);

app.get(`${PATH_PREFIX}/sensors/:sensorId/data`, dataHandler.listSensorData);
app.post(`${PATH_PREFIX}/sensors/:sensorId/data`, dataHandler.addData);

app.get(`${PATH_PREFIX}/data`, dataHandler.listData);

export const init = async () => {
  await db.connect();
};
