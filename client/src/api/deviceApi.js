import api from './axios';

export const toggleRelay = async (id, relay_state) => {
  const response = await api.post(`/device/${id}/toggle`, { relay_state });

  return response.data;
};

export const getRelayCommand = async (id) => {
  const response = await api.get(`/device/${id}/command`);

  return response.data;
};
