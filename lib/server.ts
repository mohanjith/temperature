// init configurations before anything else
import { config } from 'dotenv';
config();

import http from 'http';
import { init, app } from './app';
import { PORT, NODE_ENV } from './config';

try {
  init();
  const server = http.createServer(app);
  server.listen(PORT, () =>
    console.log(
      `Temperature service listening on port ${PORT}, environment is ${NODE_ENV}`
    )
  );
} catch (error) {
  console.error(`Unable to start temperature service: ${error}`);
}
