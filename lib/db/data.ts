import db from './mongo';
import { MONGO_DATA_COLLECTION_NAME } from '../config';

interface TemperatureMetadata {
  sensorId: string;
}

interface Temperature {
  timestamp: Date;
  temperature: number;
  metadata: TemperatureMetadata;
}

export const findData = async () => {
  const collection = db.connection.collection(MONGO_DATA_COLLECTION_NAME);
  return await collection.find().project({ _id: 0 }).toArray();
};

export const findSensorData = async (sensorId: string) => {
  const collection = db.connection.collection(MONGO_DATA_COLLECTION_NAME);
  return await collection
    .find({ metadata: { sensorId } })
    .project({ _id: 0 })
    .toArray();
};

export const insertData = async (data: Temperature) => {
  const collection = db.connection.collection(MONGO_DATA_COLLECTION_NAME);
  await collection.insertOne(data);
};
