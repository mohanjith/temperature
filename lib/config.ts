// ------ environment variables
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV || '';
const MONGO_CONNECTION_URI =
  process.env.MONGO_CONNECTION_URI || 'mongodb://127.0.0.1:27017';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'temperature';
const MONGO_DATA_COLLECTION_NAME =
  process.env.MONGO_DATA_COLLECTION_NAME || 'data';
const MONGO_SENSORS_COLLECTION_NAME =
  process.env.MONGO_SENSORS_COLLECTION_NAME || 'sensors';

export {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_URI,
  MONGO_DB_NAME,
  MONGO_DATA_COLLECTION_NAME,
  MONGO_SENSORS_COLLECTION_NAME
};
