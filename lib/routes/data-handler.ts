import express from 'express';
import { findData, findSensorData, insertData } from '../db/data';

export const listData = async (req: express.Request, res: express.Response) => {
  const data = await findData();
  res.status(200).json(data);
};

export const listSensorData = async (
  req: express.Request,
  res: express.Response
) => {
  const data = await findSensorData(req.params.sensorId);
  res.status(200).json(data);
};

export const addData = async (req: express.Request, res: express.Response) => {
  req.body.timestamp = new Date(req.body.timestamp);
  await insertData(req.body);
  res.status(200).json({
    status: 'success',
    message: 'Saved temperature data'
  });
};
