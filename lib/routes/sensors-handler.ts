import express from 'express';
import {
  findSensors,
  insertSensor,
  findSensor,
  updateSensor
} from '../db/sensors';

export const listSensors = async (
  req: express.Request,
  res: express.Response
) => {
  const sensors = await findSensors();
  res.status(200).json(sensors);
};

export const addSensor = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await insertSensor(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Successfully saved sensor'
    });
  } catch (e: any) {
    if (e.code === 11000) {
      res.status(200).json(req.body);
    } else {
      res.status(400).json({
        error: 'Bad request',
        message: 'Failed to save the sensor details',
        statusCode: 400
      });
    }
  }
};

export const getSensor = async (
  req: express.Request,
  res: express.Response
) => {
  const sensor = await findSensor(req.params.sensorId);
  res.status(200).json(sensor);
};

export const editSensor = async (
  req: express.Request,
  res: express.Response
) => {
  await updateSensor(req.params.sensorId, req.body);
  res.status(200).json({
    status: 'success',
    message: 'Successfully updated sensor'
  });
};
