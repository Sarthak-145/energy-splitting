import api from './axios';

export const getAllReadings = async () => {
  const response = await api.get('/data');
  return response.data;
};

export const getDeviceReadings = async (deviceId) => {
  const response = await api.get(`/data/${deviceId}`);
  return response.data;
};
