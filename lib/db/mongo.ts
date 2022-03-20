import { MongoClient, Db } from 'mongodb';
import {
  MONGO_CONNECTION_URI,
  MONGO_DB_NAME,
  MONGO_DATA_COLLECTION_NAME,
  MONGO_SENSORS_COLLECTION_NAME
} from '../config';

interface Client {
  _connection: Db | null;
  client: MongoClient;
}
class Client {
  constructor() {
    this._connection = null;
  }
  async connect() {
    if (this._connection === null) {
      this.client = new MongoClient(MONGO_CONNECTION_URI, {
        socketTimeoutMS: 120000
      });
      this.client.connect();
      this._connection = this.client.db(MONGO_DB_NAME);
      if (
        !this._connection
          .listCollections({ name: MONGO_DATA_COLLECTION_NAME })
          .hasNext()
      ) {
        await this._connection.createCollection(MONGO_DATA_COLLECTION_NAME, {
          timeseries: {
            timeField: 'timestamp',
            metaField: 'metadata',
            granularity: 'seconds'
          }
        });
      }
      await this._connection
        .collection(MONGO_SENSORS_COLLECTION_NAME)
        .createIndex({ id: 1 }, { unique: true });
      console.log('Connected successfully to MongoDB server');
    }
  }
  get connection() {
    if (this._connection !== null) {
      return this._connection;
    }
    throw new Error('No DB connection');
  }
}

export default new Client();
