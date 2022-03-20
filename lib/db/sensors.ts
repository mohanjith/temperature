import db from './mongo';
import { MONGO_SENSORS_COLLECTION_NAME } from '../config';

interface Sensor {
  id: string;
  location: string;
  model: string;
  indoor: boolean;
}

export const findSensors = async () => {
  const collection = db.connection.collection(MONGO_SENSORS_COLLECTION_NAME);
  return await collection.find().project({ _id: 0 }).toArray();
};

export const findSensor = async (sensorId: string) => {
  const collection = db.connection.collection(MONGO_SENSORS_COLLECTION_NAME);
  const sensors = await collection
    .find({ id: sensorId })
    .project({ _id: 0 })
    .toArray();
  return sensors.length > 0 ? sensors[0] : {};
};

export const insertSensor = async (sensor: Sensor) => {
  const collection = db.connection.collection(MONGO_SENSORS_COLLECTION_NAME);
  await collection.insertOne(sensor);
  return sensor;
};

export const updateSensor = async (sensorId: string, sensor: Sensor) => {
  const collection = db.connection.collection(MONGO_SENSORS_COLLECTION_NAME);
  await collection.updateOne({ id: sensorId }, { $set: sensor });
  return sensor;
};
